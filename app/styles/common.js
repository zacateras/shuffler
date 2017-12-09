import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
      backgroundColor: '#000000',
      flex: 1
    },

    btnPrimary: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'Helvetica',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
  
    btnPrimaryContainer: {
      backgroundColor: '#2ab759',
      padding: 13,
      borderRadius: 24,
    }
  });