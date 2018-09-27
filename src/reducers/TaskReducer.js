import {
  GET_CURRENT_DAY_TASKS,
  GET_ONE_TASK,
  CREATE_ONE_TASK,
  DELETE_ONE_TASK,
  DELETE_ONE_STATUS
} from '../actions/types';

const INITIAL_STATE = {
  tasks: [],
  task: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_DAY_TASKS:
      return { ...state, ...payload };
    case GET_ONE_TASK:
      return { ...state, ...payload };
    case CREATE_ONE_TASK:
      {
        const tasks = [...state.tasks, payload.task];
        return { ...state, tasks };
      }
    case DELETE_ONE_TASK:
      {
        const tasks = state.tasks.filter(task => task.id !== payload);
        return { ...state, tasks };
      }
    case DELETE_ONE_STATUS:
      {
        const index = state.task.taskStatus.findIndex((status) => status.id === payload);
        const taskStatus = [...state.task.taskStatus.slice(0, index),
          ...state.task.taskStatus.slice(index + 1)];
        const task = { ...state.task, taskStatus };
        return { ...state, task };
      }
    default:
      return state;
  }
};
