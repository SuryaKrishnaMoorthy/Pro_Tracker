import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AddTaskNavigator from './AddTaskNavigator';
import Home from '../screens/Home';
import TaskView from '../screens/TaskView';
import TaskForm from '../screens/TaskForm';
import SideBar from '../screens/SideBar';
import DrawerPro from '../screens/DrawerPro';

const AppNavigator = createSwitchNavigator({
  DrawerPro,
  Home,
  SideBar,
  Auth: AuthNavigator,
  AddTaskNavigator,
  TaskView,
  TaskForm
});

export default AppNavigator;
