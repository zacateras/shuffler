export default class {
  constructor() {
    this._baseUrl = "http://192.168.8.100:49849/api";
  }

  async put(spotifyToken) {
    return await this.__fetch("/session", "PUT", {
      spotifyToken: spotifyToken
    });
  }

  async delete(sessionId, hostToken) {
    return await this.__fetch("/session/" + sessionId, "DELETE", {
      hostToken: hostToken
    });
  }

  async join(sessionId) {
    return await this.__fetch("/session/" + sessionId + "/join", "POST", {});
  }

  async find(sessionId, query) {
    return await this.__fetch("/session/" + sessionId + "/find?q=" + query, "GET");
  }

  async playlist(sessionId) {
    return await this.__fetch("/session/" + sessionId + "/playlist", "GET");
  }

  async add(sessionId, trackUri) {
    return await this.__fetch("/session/" + sessionId + "/add", "PUT", {
      trackUri: trackUri
    });
  }

  async vote(sessionId, clientId, trackUri) {
    return await this.__fetch("/session/" + sessionId + "/vote", "PUT", {
      clientId: clientId,
      trackUri: trackUri
    });
  }

  async __fetch(relativeUri, method, body) {
    try {
      let response = await fetch(this._baseUrl + relativeUri, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        method: method,
        body: JSON.stringify(body)
      });
      // console.log(response);

      let responseJson = await response.json();
      // console.log(responseJson);

      return responseJson;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
}
