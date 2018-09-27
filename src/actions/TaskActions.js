import { getCurrentDayTasksRequest,
   getOneTaskRequest,
   createOneTaskRequest,
   deleteOneTaskRequest
 } from '../requests';
import {
  GET_CURRENT_DAY_TASKS,
  GET_ONE_TASK,
  CREATE_ONE_TASK,
  DELETE_ONE_TASK
} from './types';

export const getCurrentDayTasks = () => {
  return async (dispatch) => {
    const payload = await getCurrentDayTasksRequest();
    dispatch({ type: GET_CURRENT_DAY_TASKS, payload });
  };
};

export const getOneTask = (id) => {
  return async (dispatch) => {
    const payload = await getOneTaskRequest(id);
    dispatch({ type: GET_ONE_TASK, payload });
  };
};

export const createOneTask = (body) => {
  return async (dispatch) => {
    const payload = await createOneTaskRequest(body);
    dispatch({ type: CREATE_ONE_TASK, payload });
  };
};

export const deleteOneTask = (id) => {
  return async (dispatch) => {
    await deleteOneTaskRequest(id);
    const payload = id;
    console.log('ACTION', payload, id);
    dispatch({ type: DELETE_ONE_TASK, payload });
  };
};
