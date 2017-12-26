import { AsyncStorage } from "react-native";

export class SessionStore {
  async get() {
    let sessionString = await AsyncStorage.getItem("session");
    return sessionString ? JSON.parse(sessionString) : sessionString;
  }

  async set(session) {
    await AsyncStorage.setItem("session", JSON.stringify(session));
  }

  async clear() {
    await AsyncStorage.removeItem("session");
  }
}

export class ClientSession {
  constructor(id, clientId, clientToken) {
    this.id = id;
    this.clientId = clientId;
    this.clientToken = clientToken;
  }
}

export class HostSession extends ClientSession {
  constructor(id, clientId, clientToken, hostToken, spotifyPlaylistUri, spotifyToken, refreshTime) {
    super(id, clientId, clientToken);

    this.refreshTime = refreshTime;
    this.spotifyToken = spotifyToken;
    this.spotifyPlaylistUri = spotifyPlaylistUri;
    this.hostToken = hostToken;
  }
}
