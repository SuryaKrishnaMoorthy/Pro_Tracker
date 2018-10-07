import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import AddTaskNavigator from './AddTaskNavigator';
import TaskView from '../screens/TaskView';
import BadgeView from '../screens/BadgeView';
import DiscussionBoard from '../screens/DiscussionBoard';

const AppNavigator = createSwitchNavigator({
  AuthNavigator,
  HomeNavigator,
  AddTaskNavigator,
  TaskView,
  BadgeView,
  DiscussionBoard
});

export default AppNavigator;
