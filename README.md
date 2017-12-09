- Spotify API
-- Scopes:
--- user-read-playback-state
--- user-modify-playback-state
--- user-read-currently-playing
--- user-read-recently-played

https://api.spotify.com/v1/me/playlists
{
  "href" : "https://api.spotify.com/v1/users/1172439567/playlists?offset=0&limit=20",
  "items" : [ {
    "collaborative" : true,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/1172439567/playlist/5VDIISgNrO6KBwqsC7ZAUn"
    },
    "href" : "https://api.spotify.com/v1/users/1172439567/playlists/5VDIISgNrO6KBwqsC7ZAUn",
    "id" : "5VDIISgNrO6KBwqsC7ZAUn",
    "images" : [ ],
    "name" : "The best of LLW",
    "owner" : {
      "display_name" : "Michał Sitko",
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/1172439567"
      },
      "href" : "https://api.spotify.com/v1/users/1172439567",
      "id" : "1172439567",
      "type" : "user",
      "uri" : "spotify:user:1172439567"
    },
    "public" : false,
    "snapshot_id" : "XthnXJE3DCKiE4WyM+0r9v7hXplP32W4v5CS5NrO+gkPI4redqabjzOtV/SRjGAe",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/1172439567/playlists/5VDIISgNrO6KBwqsC7ZAUn/tracks",
      "total" : 0
    },
    "type" : "playlist",
    "uri" : "spotify:user:1172439567:playlist:5VDIISgNrO6KBwqsC7ZAUn"
  }
}

https://api.spotify.com/v1/me
{
  "birthdate" : "1992-07-21",
  "country" : "PL",
  "display_name" : "Michał Sitko",
  "email" : "mic.sitko@gmail.com",
  "external_urls" : {
    "spotify" : "https://open.spotify.com/user/1172439567"
  },
  "followers" : {
    "href" : null,
    "total" : 13
  },
  "href" : "https://api.spotify.com/v1/users/1172439567",
  "id" : "1172439567",
  "images" : [ {
    "height" : null,
    "url" : "https://scontent.xx.fbcdn.net/v/t1.0-1/c50.50.621.621/s200x200/1235335_710437935649106_109426470_n.jpg?oh=980a56fa56632aefc015cdbaf2e04c32&oe=5AAF2781",
    "width" : null
  } ],
  "product" : "premium",
  "type" : "user",
  "uri" : "spotify:user:1172439567"
}

https://api.spotify.com/v1/me/player/play
