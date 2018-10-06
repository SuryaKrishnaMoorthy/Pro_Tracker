import { GET_BADGES } from '../actions/types';

const INITIAL_STATE = {
  badges: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_BADGES:
      return { ...state, ...payload };
    default:
      return state;
    }
  };
