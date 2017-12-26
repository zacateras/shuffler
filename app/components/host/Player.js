import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "react-native-button";
import common from "../../styles/common";

import SpotifyApi from "../../services/SpotifyApi";

export default class extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Player'
  };

  spotify = new SpotifyApi();

  handlePlayAsync = async () => {
    await this.spotify.playerPlayPlaylist();
  };

  handleResumeAsync = async () => {
    await this.spotify.playerPlay();
  };

  hanleStopAsync = async () => {
    await this.spotify.playerPause();
  };

  render() {
    return (
      <View style={[common.background, style.playerBaseView]}>
        <View style={{padding: 15}}>
          <Button
            style={common.btnPrimary}
            containerStyle={common.btnPrimaryContainer}
            onPress={this.handlePlayAsync.bind(this)}>
            P L A Y
          </Button>
        </View>
        <View style={{padding: 15}}>
          <Button
            style={common.btnPrimary}
            containerStyle={common.btnPrimaryContainer}
            onPress={this.handleResumeAsync.bind(this)}>
            R E S U M E
          </Button>
        </View>
        <View style={{padding: 15}}>
          <Button
            style={common.btnPrimary}
            containerStyle={common.btnPrimaryContainer}
            onPress={this.hanleStopAsync.bind(this)}>
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