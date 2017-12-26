'use strict';

import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import common from "../../styles/common";

export default class extends React.Component {
  render() {
    return (
      <View style={[common.background, style.baseView]}>
        <ActivityIndicator animating={ true } size='large' color='#2ab759' />
      </View>
    );
  }
}

const style = StyleSheet.create({
  baseView: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1
  }
});