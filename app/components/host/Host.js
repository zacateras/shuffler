'use strict';

import React from 'react';
import { TabNavigator } from "react-navigation";
import common from '../../styles/common';
import Playlist from "../shared/Playlist";
import Player from "./Player";
import HostQr from "./HostQr";

export default TabNavigator({
  HostQr: {
    screen: HostQr
  },
  Player: {
    screen: Player
  },
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