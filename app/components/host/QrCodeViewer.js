import React from "react";
import QRCode from "react-native-qrcode";
import common from "../../styles/common";

import { StyleSheet, View, TextInput, Text } from "react-native";
import { SessionStore } from "../../stores/Session";
import { style } from "expo/src/Font";

export default class extends React.Component {
  static navigationOptions = {
    tabBarLabel: "QR Code",
    title: "HOSTING ROOM...",
    headerTintColor: "#919496",
    headerStyle: {
      backgroundColor: "#222326"
    }
  };

  constructor() {
    super();

    this._sessionStore = new SessionStore();
    this.state = { text: '' };
  }

  async componentDidMount() {
    let session = await this._sessionStore.get();
    
    this.setState({
      text: "shuffler@session=" + session.id
    });
  }

  render() {
    return (
      <View style={[common.background, styles.container]}>
        <Text style={styles.joinmeText}>JOIN THE</Text>
        <Text style={[styles.joinmeText, { paddingBottom: 10 }]}>
          <Text style={styles.joinmeAccentText}>MUSIC</Text> ROOM
        </Text>
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={this.state.text}
            size={200}
            bgColor="#000"
            fgColor="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  joinmeText: {
    color: "#ccc",
    fontSize: 26
  },
  joinmeAccentText: {
    color: "#2ab759",
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  qrCodeContainer: {
    padding: 5,
    backgroundColor: '#ffffff'
  }
});
