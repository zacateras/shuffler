using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class TrackVote
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public string SpotifyTrackUri { get; set; }

        public Client Client { get; set; }
    }
}