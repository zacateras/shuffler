using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly SessionService _sessionService;

        public SessionController(SessionService sessionService)
        {
            _sessionService = sessionService;    
        }

        // PUT /session
        [HttpPut]
        public async Task<SessionPutViewModel> Put([FromBody]SessionPutRequest request)
        {
            var session = await _sessionService.Create(request.SpotifyToken);

            return new SessionPutViewModel
            {
                HostToken = session.HostToken,
                SessionId = session.Id
            };
        }

        // DELETE /session/{id}
        [HttpDelete("{sessionId}")]
        public async Task Delete(int sessionId, [FromBody]SessionDeleteRequest request)
        {
            await _sessionService.Delete(sessionId, request.HostToken);
        }

        // POST /session/{id}/join
        [HttpPost("{sessionId}/[action]")]
        public async Task<SessionJoinViewModel> Join(int sessionId)
        {
            return await _sessionService.Join(sessionId);
        }

        // GET /session/{id}/find
        [HttpGet("{sessionId}/[action]")]
        public async Task<SessionFindViewModel> Find(int sessionId, string q)
        {
            return await _sessionService.Find(sessionId, q);
        }

        // GET /session/{id}/playlist
        [HttpGet("{sessionId}/[action]")]
        public async Task<PlaylistViewModel> Playlist(int sessionId)
        {
            return await _sessionService.Playlist(sessionId);
        }

        // POST /session/{id}/add
        [HttpPut("{sessionId}/[action]")]
        public async Task<PlaylistViewModel> Add(int sessionId, [FromBody]SessionAddRequest request)
        {
            await _sessionService.Add(sessionId, request.TrackUri);

            return await _sessionService.Playlist(sessionId);
        }

        // POST /session/{id}/vote
        [HttpPut("{sessionId}/[action]")]
        public async Task<PlaylistViewModel> Vote(int sessionId, [FromBody]SessionVoteRequest request)
        {
            await _sessionService.Vote(sessionId, request.ClientId, request.TrackUri);

            return await _sessionService.Playlist(sessionId);
        }
    }

    public class SessionPutRequest
    {
        public string SpotifyToken { get; set; }
    }

    public class SessionPutViewModel
    {
        public int SessionId { get; set; }

        public string HostToken { get; set; }
    }

    public class SessionDeleteRequest
    {
        public string HostToken { get; set; }
    }

    public class SessionJoinViewModel
    {
        public int ClientId { get; set; }

        public string ClientToken { get; set; }
    }

    public class SessionFindViewModel
    {
        public IList<TrackViewModel> Tracks { get; set; }
    }

    public class PlaylistViewModel
    {
        public IList<TrackViewModel> Tracks { get; set; }
    }

    public class TrackViewModel
    {
        public string Name { get; set; }
        
        public string TrackUri { get; set; }

        public int VotesCount { get; set; }
    }

    public class SessionAddRequest
    {
        public string TrackUri { get; set; }
    }

    public class SessionVoteRequest
    {
        public int ClientId { get; set; }

        public string TrackUri { get; set; }
    }

    public class SessionClientRequest
    {
        public string ClientToken { get; set; }
    }
}