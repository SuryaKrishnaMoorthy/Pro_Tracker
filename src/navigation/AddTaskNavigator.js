import { createStackNavigator } from 'react-navigation';
import HomeNavigator from './HomeNavigator';
import AddTask from '../screens/AddTask';
import TaskForm from '../screens/TaskForm';
import SelectTask from '../screens/SelectTask';
import EditTaskForm from '../screens/EditTaskForm';
import DrawerPro from '../screens/DrawerPro';

const AddTaskNavigator = createStackNavigator({
  HomeNavigator: {
    screen: HomeNavigator,
    navigationOptions: () => ({
      header: null
    })
  },
  DrawerPro: {
    screen: DrawerPro,
    navigationOptions: () => ({
      header: null
    })
  },
  AddTask: {
    screen: AddTask,
    navigationOptions: () => ({
      header: null
    })
  },
  SelectTask: {
    screen: SelectTask,
    navigationOptions: () => ({
      header: null
    })
  },
  TaskForm: {
    screen: TaskForm,
    navigationOptions: () => ({
      header: null
    })
  },
  EditTaskForm: {
    screen: EditTaskForm,
    navigationOptions: () => ({
      header: null
    })
  },
  mode: 'modal',
});

export default AddTaskNavigator;
