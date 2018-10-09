import {
   getAllTasksRequest,
   getCurrentDayTasksRequest,
   getTasksByTypeRequest,
   getOneTaskRequest,
   createOneTaskRequest,
   updateOneTaskRequest,
   deleteOneTaskRequest
 } from '../requests';
import {
  GET_ALL_TASKS,
  GET_CURRENT_DAY_TASKS,
  GET_TASKS_BY_TYPE,
  GET_ONE_TASK,
  DELETE_ONE_TASK
} from './types';

export const getCurrentDayTasks = (dateParams) => {
  return async (dispatch) => {
    const payload = await getCurrentDayTasksRequest(dateParams);
    dispatch({ type: GET_CURRENT_DAY_TASKS, payload });
  };
};

export const getAllTasks = () => {
  return async (dispatch) => {
    const payload = await getAllTasksRequest();
    dispatch({ type: GET_ALL_TASKS, payload });
  };
};

export const getTasksByType = (type) => {
  return async (dispatch) => {
    const payload = await getTasksByTypeRequest(type);
    dispatch({ type: GET_TASKS_BY_TYPE, payload });
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
    await createOneTaskRequest(body);
    const payload = await getCurrentDayTasksRequest(new Date());
    dispatch({ type: GET_CURRENT_DAY_TASKS, payload });
  };
};

export const updateOneTask = (id, body) => {
  return async (dispatch) => {
    await updateOneTaskRequest(id, body);
    const payload = await getCurrentDayTasksRequest(new Date());
    dispatch({ type: GET_CURRENT_DAY_TASKS, payload });
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
