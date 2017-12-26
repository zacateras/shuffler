'use strict';

import React from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import common from "../styles/common";
import { SessionStore, ClientSession, HostSession } from "../stores/Session";
import Button from "react-native-button";
import { AuthSession } from "expo";
import SessionApi from "../services/SessionApi";

export default class extends React.Component {

  sessionStore = new SessionStore();
  sessionApi = new SessionApi();

  state = {
    loading: false,
    session: null
  }

  async componentWillMount() {
    let session = await this.sessionStore.get();

    this.setState({ session: session });
  }

  handleResumePressAsync = async () => {
    let session = await this.sessionStore.get();

    const { navigation } = this.props;
    navigation.navigate(session.hostToken ? "Host" : "Client");
  };

  handleHostPressAsync = async () => {
    this.setState({ loading: true });

    try {
      await this.sessionStore.clear();

      let authRedirectUrl = AuthSession.getRedirectUrl();
      let authResult = await AuthSession.startAsync({
        authUrl:
          "https://accounts.spotify.com/authorize" +
          "?client_id=851e3713769649e18fcef814d6aa7686" +
          "&redirect_uri=" + encodeURIComponent(authRedirectUrl) +
          "&scope=playlist-modify-public%20playlist-modify-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played" +
          "&response_type=token"
      });
      
      let response = await this.sessionApi.put(authResult.params.access_token);
      let session = new HostSession(
        response.sessionId,
        response.clientId,
        response.clientToken,
        response.hostToken,
        response.playlistUri,
        authResult.params.access_token,
        new Date());
        
      await this.sessionStore.set(session);
      this.setState({ session: session });

      const { navigation } = this.props;
      navigation.navigate("Host");
    }
    catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
  };

  handleJoinPressAsync = async () => {
    await this.sessionStore.clear();

    const { navigation } = this.props;
    navigation.navigate("ClientQr");
  };

  render() {
    const { navigation } = this.props;
    return (
      this.state.loading
      ?
      <View style={[common.background, style.homeBaseView]}>
       <ActivityIndicator animating={ true } size='large' color='#2ab759' />
      </View>
      :
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
                onPress={this.handleResumePressAsync.bind(this)}>
                R E S U M E
              </Button>
            </View>
          }
          <View style={{ padding: 15 }}>
            <Button
              style={common.btnPrimary}
              containerStyle={common.btnPrimaryContainer}
              onPress={this.handleHostPressAsync.bind(this)}>
              H O S T
            </Button>
          </View>
          <View style={{ padding: 15 }}>
            <Button
              style={common.btnPrimary}
              containerStyle={common.btnPrimaryContainer}
              onPress={this.handleJoinPressAsync.bind(this)}>
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
