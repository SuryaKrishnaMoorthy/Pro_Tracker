import { createStackNavigator } from 'react-navigation';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';

const AuthNavigator = createStackNavigator({
    Login,
    SignUp,
  });

export default AuthNavigator;
