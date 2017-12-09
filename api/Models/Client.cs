using System;
using System.Collections.Generic;

namespace api.Models
{
    public class Client
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public string ClientToken { get; set; }

        public Session Session { get; set; }

        public IList<TrackVote> TrackVotes { get; set; }
    }
}