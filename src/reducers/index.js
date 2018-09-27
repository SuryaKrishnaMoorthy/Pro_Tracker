import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TaskReducer from './TaskReducer';

export default combineReducers({
  auth: AuthReducer,
  data: TaskReducer
});
