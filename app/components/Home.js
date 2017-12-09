import React from "react";
import { Text, View, StyleSheet, AppState } from "react-native";
import common from "../styles/common";
import Auth from "../stores/Auth";
import Button from "react-native-button";
import { AuthSession } from "expo";

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._auth = new Auth();
    this._handleHostPressAsync = this._handleHostPressAsync.bind(this);
    this._handleJoinPressAsync = this._handleJoinPressAsync.bind(this);
  }

  _handleHostPressAsync = async () => {
    const { navigation } = this.props;

    var redirectUrl = AuthSession.getRedirectUrl();
    var result = await AuthSession.startAsync({
      authUrl: 'https://accounts.spotify.com/authorize' +
        '?client_id=851e3713769649e18fcef814d6aa7686' + 
        '&redirect_uri=' + encodeURIComponent(redirectUrl) +
        '&scope=user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played' +
        '&response_type=token'
    });
    
    switch (result.type) {
      case 'success':
        this._auth.setToken(result.params.access_token);
        
        navigation.navigate('Host');
        break;
    
      default:
        break;
    }
  };

  _handleJoinPressAsync = async () => {
    const { navigation } = this.props;

    navigation.navigate('Join');
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={[common.background, style.homeBaseView]}>
        <View style={style.homeLogoView}>
          <Text style={style.homeLogoText}>SHUFFLER</Text>
        </View>
        <View style={style.homeBtnView}>
          <View style={{padding: 15}}>
            <Button
              style={common.btnPrimary}
              containerStyle={common.btnPrimaryContainer}
              onPress={this._handleHostPressAsync}>
              H O S T
            </Button>
          </View>
          <View style={{padding: 15}}>
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
    justifyContent: 'center',
    flexDirection: 'column'
  },

  homeLogoView: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    flex: 10
  },

  homeLogoText: {
    color: '#2ab759',
    fontSize: 42
  },

  homeBtnView: {
    flex: 10,
    justifyContent: 'center',
    alignContent: 'center'
  }
});