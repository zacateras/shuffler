import React from "react";
import Font from 'expo';
import Navigator from './components/Navigator';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Helvetica': require('./assets/fonts/helvetica.ttf')
    })
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Navigator />
      )
    } else {
      return <Expo.AppLoading />
    }
  }
}
