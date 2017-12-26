import { StackNavigator } from "react-navigation";
import Home from './Home';
import Client from './client/Client';
import ClientQr from "./client/ClientQr";
import Host from './host/Host';

export default StackNavigator({
    Home: { 
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Host: {
      screen: Host,
      navigationOptions: {
        title: 'MUSIC ROOM - HOST'
      }
    },
    ClientQr: {
      screen: ClientQr,
      navigationOptions: {
        title: 'MUSIC ROOM - CLIENT'
      }
    },
    Client: {
      screen: Client,
      navigationOptions: {
        title: 'MUSIC ROOM - CLIENT'
      }
    }
  }, {
    navigationOptions: {
      headerMode: 'screen',
      headerTintColor: '#919496',
      headerStyle: {
        backgroundColor: '#222326'
      }
    }
  });
  