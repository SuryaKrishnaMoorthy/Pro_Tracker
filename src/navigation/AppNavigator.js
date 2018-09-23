import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import Home from '../screens/Home';
import TaskView from '../screens/TaskView';

const AppNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Home,
    TaskView
  });

export default AppNavigator;
