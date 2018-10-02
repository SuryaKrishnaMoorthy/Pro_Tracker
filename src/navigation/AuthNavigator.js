import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const AuthNavigator = createStackNavigator({
    Login,
    SignUp,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

export default AuthNavigator;
