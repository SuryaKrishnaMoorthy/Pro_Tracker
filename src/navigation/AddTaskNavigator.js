import { createStackNavigator } from 'react-navigation';
import AddTask from '../screens/AddTask';
import TaskForm from '../screens/TaskForm';
import EventTasks from '../screens/EventTasks';

const AddTaskNavigator = createStackNavigator({
  AddTask: {
    screen: AddTask,
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
  EventTasks: {
    screen: EventTasks,
    navigationOptions: () => ({
      header: null
    })
  }
});

export default AddTaskNavigator;
