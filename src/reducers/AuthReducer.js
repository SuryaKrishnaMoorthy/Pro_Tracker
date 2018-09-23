import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  ZIPCODE_CHANGED,
  SIGNUP_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
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
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed',
        password: '',
        token: '',
        loading: false,
        loggedIn: false
      };
    default:
      return state;
  }
};
