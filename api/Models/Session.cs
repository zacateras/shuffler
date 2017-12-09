using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Session
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public string HostToken { get; set; }
        
        public string SpotifyAccessToken { get; set; }

        public string SpotifyUserId { get; set; }

        public string SpotifyUserUri { get; set; }

        public string SpotifyPlaylistId { get; set; }

        public string SpotifyPlaylistUri { get; set; }

        public IList<Client> Clients { get; set; }
    }
}