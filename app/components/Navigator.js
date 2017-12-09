import { StackNavigator } from "react-navigation";
import Home from './Home';
import Client from './client/Client';
import Host from './host/Host';

export default StackNavigator({
    Home: { 
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Host: { screen: Host },
    Client: { screen: Client }
  }, {
    navigationOptions: {
      headerMode: 'screen',
    }
  });
  