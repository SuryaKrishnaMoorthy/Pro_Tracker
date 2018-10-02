import {
  GET_CURRENT_DAY_TASKS,
  GET_TASKS_BY_TYPE,
  GET_ONE_TASK,
  CREATE_ONE_TASK,
  UPDATE_ONE_TASK,
  CREATE_ONE_STATUS,
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
    case GET_TASKS_BY_TYPE:
      return { ...state, ...payload };
    case GET_ONE_TASK:
      return { ...state, ...payload };
    case CREATE_ONE_TASK:
      {
        const tasks = [...state.tasks, payload.task];
        return { ...state, tasks };
      }
    case UPDATE_ONE_TASK:
      {
        const task = { ...state.task, ...payload };
        return { ...state, task };
      }
    case DELETE_ONE_TASK:
      {
        const tasks = state.tasks.filter(task => task.id !== payload);
        return { ...state, tasks };
      }
    case CREATE_ONE_STATUS:
      {
        const currentScore = state.task.current_score < state.task.total_score
        ? state.task.current_score + 100
        : state.task.currentScore;
        const task = { ...state.task,
          current_score: currentScore,
          taskStatus: state.task.taskStatus.concat(payload.task_status) };
        return { ...state, task };
      }
    case DELETE_ONE_STATUS:
      {
        const index = state.task.taskStatus.findIndex((status) => status.id === payload);
        const taskStatus = [...state.task.taskStatus.slice(0, index),
          ...state.task.taskStatus.slice(index + 1)];
        const currentScore = state.task.current_score > 0 ? state.task.current_score - 100 : 0;
        const task = { ...state.task, current_score: currentScore, taskStatus };
        return { ...state, task };
      }
    default:
      return state;
  }
};
