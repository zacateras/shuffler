import { StackNavigator } from "react-navigation";
import Home from './Home';
import Client from './client/Client';
import ClientQrCodeScanner from "./client/ClientQrCodeScanner";
import Host from './host/Host';

export default StackNavigator({
    Home: { 
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Host: { screen: Host },
    ClientQrCodeScanner: { screen: ClientQrCodeScanner },
    Client: { screen: Client }
  }, {
    navigationOptions: {
      headerMode: 'screen',
    }
  });
  