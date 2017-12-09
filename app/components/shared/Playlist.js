import React from "react";
import { Text, View } from "react-native";
import common from "../../styles/common";
import { SearchBar } from "react-native-elements";

export default class extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Playlist',
    title: 'HOSTING ROOM...',
    headerTintColor: '#919496',
    headerStyle: {
      backgroundColor: '#222326'
    }
  };

  someMethod() {
    console.log("abcde");
  }

  render() {
    return (
      <View style={common.background}>
        <SearchBar
          round
          onChangeText={this.someMethod}
          onClearText={this.someMethod}
          placeholder='Type Here...' />
      </View>
    );
  }
}