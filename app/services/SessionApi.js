export default class {
  constructor() {
    this._auth = new Auth();
    this._baseUrl = "http://192.168.8.100:49849";
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
    return await this.__fetch("/session/" + sessionId + "/find?")
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

      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
