import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "react-native-button";
import common from "../../styles/common";

import Spotify from "../../services/Spotify";

export default class extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Player',
    title: 'HOSTING ROOM...',
    headerTintColor: '#919496',
    headerStyle: {
      backgroundColor: '#222326'
    }
  };

  constructor(props, context) {
    super(props, context);

    this._spotify = new Spotify();
    this._handlePlayAsync = this._handlePlayAsync.bind(this);
    this._hanleStopAsync = this._hanleStopAsync.bind(this);
  }

  _handlePlayAsync = async () => {
    await this._spotify.playerPlay();
  };

  _hanleStopAsync = async () => {
    await this._spotify.playerPause();
  };

  render() {
    return (
      <View style={[common.background, style.playerBaseView]}>
        <View style={{padding: 15}}>
          <Button
            style={common.btnPrimary}
            containerStyle={common.btnPrimaryContainer}
            onPress={this._handlePlayAsync}>
            P L A Y
          </Button>
        </View>
        <View style={{padding: 15}}>
          <Button
            style={common.btnPrimary}
            containerStyle={common.btnPrimaryContainer}
            onPress={this._hanleStopAsync}>
            P A U S E
          </Button>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  playerBaseView: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column'
  }
});