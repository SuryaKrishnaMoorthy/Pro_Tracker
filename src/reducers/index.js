import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TaskReducer from './TaskReducer';
import BadgeReducer from './BadgeReducer';

export default combineReducers({
  auth: AuthReducer,
  data: TaskReducer,
  badges: BadgeReducer
});
