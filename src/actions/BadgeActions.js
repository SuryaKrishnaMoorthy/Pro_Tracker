import { getBadgeRequest } from '../requests';
import { GET_BADGES } from './types';

export const getBadges = () => {
  return async (dispatch) => {
    const payload = await getBadgeRequest();
    dispatch({ type: GET_BADGES, payload });
  };
};
