import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  ZIPCODE_CHANGED,
  SIGNUP_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  SIGN_UP_USER_FAIL,
  LOGIN_USER_FAIL,
  CLEAR_ERROR,
  LOGOUT,
  GET_USER,
  DELETE_USER
 } from '../actions/types';

const INITIAL_STATE = {
  email: 'janedoe@gmail.com',
  password: 'password',
  first_name: '',
  last_name: '',
  zip_code: '',
  token: '',
  error: '',
  loading: false,
  loggedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case FIRSTNAME_CHANGED:
      return { ...state, first_name: action.payload };
    case LASTNAME_CHANGED:
      return { ...state, last_name: action.payload };
    case ZIPCODE_CHANGED:
      return { ...state, zip_code: action.payload };
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, token: action.payload, loading: false, loggedIn: true };
    case GET_USER:
      return { ...state, ...action.payload };
    case LOGIN_USER_FAIL:
      return {
        ...state, ...INITIAL_STATE, error: 'Authentication Failed', loading: false };
    case SIGN_UP_USER_FAIL:
      return {
        ...state, ...INITIAL_STATE, loading: false
      };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case LOGOUT:
      return INITIAL_STATE;
    case DELETE_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
