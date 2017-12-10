'use strict';

import React from "react";
import { View, StyleSheet, Image } from "react-native";
import common from "../styles/common";
import { SessionStore, ClientSession, HostSession } from "../stores/Session";
import Button from "react-native-button";
import { AuthSession } from "expo";
import SessionApi from "../services/SessionApi";

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._handleResumePressAsync = this._handleResumePressAsync.bind(this);
    this._handleHostPressAsync = this._handleHostPressAsync.bind(this);
    this._handleJoinPressAsync = this._handleJoinPressAsync.bind(this);

    this.state = { session: null };
  }

  async componentDidMount() {
    let sessionStore = new SessionStore();
    let session = await sessionStore.get();

    this.setState({ session: session });
  }

  _handleResumePressAsync = async () => {
    let sessionStore = new SessionStore();
    let session = await sessionStore.get();

    const { navigation } = this.props;
    navigation.navigate(session.hostToken ? "Host" : "Join");
  };

  _handleHostPressAsync = async () => {
    let sessionStore = new SessionStore();
    let sessionApi = new SessionApi();

    await sessionStore.clear();

    let authRedirectUrl = AuthSession.getRedirectUrl();
    let authResult = await AuthSession.startAsync({
      authUrl:
        "https://accounts.spotify.com/authorize" +
        "?client_id=851e3713769649e18fcef814d6aa7686" +
        "&redirect_uri=" + encodeURIComponent(authRedirectUrl) +
        "&scope=playlist-modify-public%20playlist-modify-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played" +
        "&response_type=token"
    });

    let sessionResult = await sessionApi.put(authResult.params.access_token);
    let session = new HostSession(
      sessionResult.sessionId,
      sessionResult.clientId,
      sessionResult.clientTokent,
      sessionResult.hostToken,
      authResult.params.access_token,
      new Date());
      
    await sessionStore.set(session);
    this.setState({ session: session });
    
    const { navigation } = this.props;
    navigation.navigate("Host");
  };

  _handleJoinPressAsync = async () => {
    let sessionStore = new SessionStore();
    await sessionStore.clear();

    const { navigation } = this.props;
    navigation.navigate("Join");
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.background, style.homeBaseView]}>
        <View style={style.homeLogoView}>
          <Image source={require('../assets/splash.png')} />
        </View>
        <View style={style.homeBtnView}>
          {
            this.state.session &&
            <View style={{ padding: 15 }}>
              <Button
                style={common.btnPrimary}
                containerStyle={common.btnPrimaryContainer}
                onPress={this._handleResumePressAsync}>
                R E S U M E
              </Button>
            </View>
          }
          <View style={{ padding: 15 }}>
            <Button
              style={common.btnPrimary}
              containerStyle={common.btnPrimaryContainer}
              onPress={this._handleHostPressAsync}>
              H O S T
            </Button>
          </View>
          <View style={{ padding: 15 }}>
            <Button
              style={common.btnPrimary}
              containerStyle={common.btnPrimaryContainer}
              onPress={this._handleJoinPressAsync}>
              J O I N
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  homeBaseView: {
    justifyContent: "center",
    flexDirection: "column"
  },

  homeLogoView: {
    justifyContent: "center",
    alignContent: "flex-end",
    flexDirection: "row",
    flex: 10
  },

  homeLogoText: {
    color: "#2ab759",
    fontSize: 42
  },

  homeBtnView: {
    flex: 10,
    justifyContent: "center",
    alignContent: "center"
  }
});
