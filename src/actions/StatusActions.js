import { deleteOneStatusRequest, createOneStatusRequest } from '../requests';
import {
  CREATE_ONE_STATUS,
  DELETE_ONE_STATUS
} from './types';

export const createOneStatus = (body) => {
  return async (dispatch) => {
    const payload = await createOneStatusRequest(body);
    dispatch({ type: CREATE_ONE_STATUS, payload });
  };
};

export const deleteOneStatus = (taskId, statusId) => {
  return async (dispatch) => {
    await deleteOneStatusRequest(taskId, statusId);
    dispatch({ type: DELETE_ONE_STATUS, payload: statusId });
  };
};
