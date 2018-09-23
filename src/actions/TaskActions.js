import { taskRequests } from '../requests';
import {
  GET_ALL_TASKS
} from './types';

export const getAllTasks = () => {
  return async (dispatch) => {
    const payload = await taskRequests();
    dispatch({ type: GET_ALL_TASKS, payload });
  };
};
