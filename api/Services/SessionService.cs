using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.Web;
using SpotifyAPI.Web.Enums;
using SpotifyAPI.Web.Models;

namespace api.Services
{
    public class SessionService
    {
        private readonly ApplicationDbContext _context;

        public SessionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Session> Create(string spotifyToken)
        {
            var hostToken = Guid.NewGuid().ToString();

            var spotifyApi = new SpotifyWebAPI { TokenType = "Bearer", AccessToken = spotifyToken };

            var profile = await spotifyApi.GetPrivateProfileAsync();
            var playlist = await spotifyApi.CreatePlaylistAsync(
                userId: profile.Id,
                playlistName: $"shuffler_{hostToken}",
                isPublic: false);

            var session = new Session
            {
                HostToken = hostToken,
                SpotifyAccessToken = spotifyToken,
                SpotifyUserId = profile.Id,
                SpotifyUserUri = profile.Uri,
                SpotifyPlaylistId = playlist.Id,
                SpotifyPlaylistUri = playlist.Uri
            };

            _context.Add(session);

            await _context.SaveChangesAsync();

            return session;
        }

        public async Task Delete(int sessionId, string hostToken)
        {
            var session = _context.Sessions.Single(x => x.Id == sessionId && x.HostToken == hostToken);

            _context.Remove(session);

            // TODO remove playlist
            // there is not remove playlist endpoint on Spotify API

            await _context.SaveChangesAsync();
        }

        public async Task<SessionFindViewModel> Find(int sessionId, string query)
        {
            var session = _context.Sessions.Single(x => x.Id == sessionId);
            var spotifyApi = new SpotifyWebAPI { TokenType = "Bearer", AccessToken = session.SpotifyAccessToken };

            var tracks = await spotifyApi.SearchItemsAsync(query, SearchType.Track);

            return new SessionFindViewModel
            {
                Tracks = tracks
                    .Tracks
                    .Items
                    .Select(x => new TrackViewModel
                    {
                        Name = x.Name,
                        TrackUri = x.Uri
                    })
                    .ToList()
            };
        }

        public async Task<SessionJoinViewModel> Join(int sessionId)
        {
            var session = _context.Sessions.Single(x => x.Id == sessionId);

            var client = new Client
            {
                ClientToken = Guid.NewGuid().ToString(),
                Session = session
            };

            _context.Add(client);

            await _context.SaveChangesAsync();

            return new SessionJoinViewModel
            {
                ClientId = client.Id,
                ClientToken = client.ClientToken
            };
        }

        public async Task<PlaylistViewModel> Playlist(int sessionId)
        {
            var session = _context.Sessions.Single(x => x.Id == sessionId);
            var spotifyApi = new SpotifyWebAPI { TokenType = "Bearer", AccessToken = session.SpotifyAccessToken };

            var spotifyTracks = await spotifyApi.GetPlaylistTracksAsync(session.SpotifyUserId, session.SpotifyPlaylistId);
            var sessionTracks = session.Clients?.SelectMany(x => x.TrackVotes).ToList();

            var result = ZipSessionWithSpotify(spotifyTracks, sessionTracks);

            return new PlaylistViewModel { Tracks = result.current.Select(ToTrackViewModel).ToList() };
        }

        public async Task Add(int sessionId, string trackUri)
        {
            var session = _context.Sessions.Single(x => x.Id == sessionId);
            var spotifyApi = new SpotifyWebAPI { TokenType = "Bearer", AccessToken = session.SpotifyAccessToken };
            
            var response =
                await spotifyApi.AddPlaylistTrackAsync(
                    session.SpotifyUserId,
                    session.SpotifyPlaylistId,
                    trackUri);
        }

        public async Task Vote(int sessionId, int clientId, string trackUri)
        {
            var session = _context.Sessions
                .Include(x => x.Clients)
                .ThenInclude(x => x.TrackVotes)
                .Single(x => x.Id == sessionId);

            var client = session.Clients
                .Single(x => x.Id == clientId);

            var spotifyApi = new SpotifyWebAPI { TokenType = "Bearer", AccessToken = session.SpotifyAccessToken };
            var spotifyPlaylistTracks = await spotifyApi.GetPlaylistTracksAsync(session.SpotifyUserId, session.SpotifyPlaylistId);
            var spotifyPlayingTrack = spotifyApi.GetPlayingTrack();

            if (spotifyPlayingTrack.Context != null &&
                spotifyPlayingTrack.Context.Type == "playlist" &&
                spotifyPlayingTrack.Context.Uri == session.SpotifyPlaylistUri)
            {
                // TODO 
                // * Remove votes for tracks preceeding currently playing
                // * Remove tracks preceeding currently playing
            }

            var trackVote = new TrackVote
            {
                SpotifyTrackUri = trackUri,
                Client = client
            };

            client.TrackVotes.Add(trackVote);

            var sessionTracks = session.Clients?
                .SelectMany(x => x.TrackVotes)
                .ToList();

            var result = ZipSessionWithSpotify(spotifyPlaylistTracks, sessionTracks);
            var replacements = SynchronizeSessionWithSpotify(result.current);

            foreach (var replacement in replacements)
            {
                // TODO
                // Replace with ReorderPlaylistAsync if its bug is resolved
                var spotifySnapshot = spotifyApi
                    .ReorderPlaylist(
                        session.SpotifyUserId,
                        session.SpotifyPlaylistId,
                        rangeStart: replacement.rangeStart,
                        insertBefore: replacement.insertBefore,
                        rangeLength: 1,
                        snapshotId: null);
            }

            _context.Add(trackVote);
            await _context.SaveChangesAsync();
        }

        private TrackViewModel ToTrackViewModel((PlaylistTrack track, List<TrackVote> votes) arg)
        {
            return new TrackViewModel
            {
                Name = arg.track.Track.Name,
                TrackUri = arg.track.Track.Uri,
                VotesCount = arg.votes.Count
            };
        }

        private (List<(PlaylistTrack track, List<TrackVote> votes)> current, List<TrackVote> missing) ZipSessionWithSpotify(
            Paging<PlaylistTrack> spotifyTracks,
            IEnumerable<TrackVote> sessionTracks)
        {
            var outTracks =
                sessionTracks?.GroupBy(x => x.SpotifyTrackUri)?.ToDictionary(k => k.Key, v => v.ToList()) ??
                new Dictionary<string, List<TrackVote>>();
            var inTracks = new List<(PlaylistTrack track, List<TrackVote> votes)>();

            foreach (
                var spotifyTrack
                in spotifyTracks.Items?.ToList())
            {
                if (outTracks.TryGetValue(spotifyTrack.Track.Uri, out var trackVotes))
                {
                    inTracks.Add((spotifyTrack, trackVotes.ToList()));
                    outTracks.Remove(spotifyTrack.Track.Uri);
                }
                else
                {
                    inTracks.Add((spotifyTrack, new List<TrackVote>()));
                }
            }

            return (current: inTracks, missing: outTracks.Values.SelectMany(x => x).ToList());
        }

        private IEnumerable<(int insertBefore, int rangeStart)> SynchronizeSessionWithSpotify(IEnumerable<(PlaylistTrack track, List<TrackVote> votes)> items)
        {
            var currentOrder = items.ToList();
            var targetOrder = items.OrderByDescending(x => x.votes.Count).ToList();

            for (int i = 0; i < targetOrder.Count; ++i)
            {
                if (currentOrder[i].track.Track.Id == targetOrder[i].track.Track.Id)
                    continue;

                int j = i + 1;
                for (; j < currentOrder.Count; ++j)
                {
                    if (currentOrder[j].track.Track.Id == targetOrder[i].track.Track.Id)
                    {
                        var current = currentOrder[j];
                        currentOrder.RemoveAt(j);
                        currentOrder.Insert(i, current);

                        yield return (insertBefore: i, rangeStart: j);

                        break;
                    }
                }
            }
        }
    }
}