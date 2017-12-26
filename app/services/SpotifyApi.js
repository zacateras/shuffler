import { SessionStore } from "../stores/Session";

export default class {
  constructor() {
    this._sessionStore = new SessionStore();
    this._baseUrl = "https://api.spotify.com/v1";
  }

  async playerPlayPlaylist() {
    let session = await this._sessionStore.get();

    return await this.__fetch("/me/player/play", "PUT", {
      context_uri: session.spotifyPlaylistUri
    });
  }

  async playerPlay() {
    return await this.__fetch("/me/player/play", "PUT");
  }

  async playerPause() {
    return await this.__fetch("/me/player/pause", "PUT");
  }

  async __fetch(relativeUri, method, body) {
    try {
      let session = await this._sessionStore.get();
      let response = await fetch(this._baseUrl + relativeUri, {
        method: method,
        headers: {
          Authorization: "Bearer " + session.spotifyToken
        },
        body: JSON.stringify(body)
      });

      let responseJson = await response.json();
      console.log(responseJson);

      return responseJson;
    } catch (error) {
      console.log(error);
      
      return error;
    }
  }
}
