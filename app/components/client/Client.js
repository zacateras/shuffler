'use strict';

import React from 'react';
import { TabNavigator } from "react-navigation";
import Playlist from "../shared/Playlist";

export default TabNavigator({
  Playlist: {
    screen: Playlist
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#2ab759',
    inactiveTintColor: '#919496',
    style: {
      backgroundColor: '#222326'
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    }
  },
});