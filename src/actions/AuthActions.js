import {
  signUpRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  deleteUserRequest } from '../requests';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  ZIPCODE_CHANGED,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGN_UP_USER_FAIL,
  CLEAR_ERROR,
  LOGIN_USER,
  LOGOUT,
  GET_USER,
  DELETE_USER } from './types';

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
    try {
      dispatch({ type: SIGNUP_USER });
      const token = await signUpRequest(body);
      if (token) {
        loginUserSuccess(dispatch, token);
        getUser();
      } else {
        signUpUserFail(dispatch);
      }
    } catch (e) {
      signUpUserFail(dispatch);
    }
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER });
      const token = await loginRequest({ email, password });
      if (token) {
        loginUserSuccess(dispatch, token);
        getUser(dispatch);
      } else {
        loginUserFail(dispatch);
      }
    } catch (e) {
      loginUserFail(dispatch);
    }
  };
};

const getUser = async (dispatch) => {
    const response = await getUserRequest();
    dispatch({ type: GET_USER, payload: response.data });
};

export const logoutUser = () => {
  return async (dispatch) => {
    await logoutRequest();
    dispatch({ type: LOGOUT });
  };
};

export const deleteUser = () => {
  return async (dispatch) => {
    await deleteUserRequest();
    dispatch({ type: DELETE_USER });
  };
};

export const clearError = () => {
  return async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR
  });
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

const signUpUserFail = (dispatch) => {
  dispatch({
    type: SIGN_UP_USER_FAIL
  });
};
