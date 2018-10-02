import { signUpRequest, loginRequest, logoutRequest } from '../requests';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  ZIPCODE_CHANGED,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT
} from './types';

export const firstNameChanged = (text) => ({
    type: FIRSTNAME_CHANGED,
    payload: text
  });

export const lastNameChanged = (text) => ({
    type: LASTNAME_CHANGED,
    payload: text
  });

export const zipCodeChanged = (text) => ({
    type: ZIPCODE_CHANGED,
    payload: text
  });

export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text
  });

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text
  });

export const signUpUser = (body) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_USER });
    const token = await signUpRequest(body);
    if (token) {
      loginUserSuccess(dispatch, token);
    } else {
      loginUserFail(dispatch);
    }
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const token = await loginRequest({ email, password });
    if (token) {
      loginUserSuccess(dispatch, token);
    } else {
      loginUserFail(dispatch);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    await logoutRequest();
    dispatch({ type: LOGOUT });
  };
};

const loginUserSuccess = (dispatch, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: token
  });
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};
