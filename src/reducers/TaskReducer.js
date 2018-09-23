import { GET_ALL_TASKS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_ALL_TASKS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
