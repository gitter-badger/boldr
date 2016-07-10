/* @flow */
import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import { API_BASE } from '../../config.api';
polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api = `${API_BASE}/auth/login`) {
  return request[method](api, data);
}

/**
 * LOGIN ACTIONS
 */
export const LOGIN_USER_REQUEST:string = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS:string = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL:string = 'LOGIN_USER_FAIL';

const beginLogin = () => {
  return { type: LOGIN_USER_REQUEST };
};
// Login Success
export function loginSuccess(response:Object) {
  localStorage.setItem('boldr:jwt', response.data.token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: response.data.token
  };
}
// Login Error
export function loginError(message:string) {
  return {
    type: LOGIN_USER_FAIL,
    message
  };
}
// Login Action
export function manualLogin(data:Object) {
  return (dispatch:Function) => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, `${API_BASE}/auth/login`)
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(err.data.message));
      });
  };
}

/**
 * SIGNUP ACTIONS
 */
export const SIGNUP_USER_REQUEST:string = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS:string = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAIL:string = 'SIGNUP_USER_FAIL';

// Signup
const beginSignUp = () => {
  return { type: SIGNUP_USER_REQUEST };
};
// Signup Success
export function signUpSuccess(response:Object) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: response
  };
}
// Signup Error
export function signUpError(message:string) {
  return {
    type: SIGNUP_USER_FAIL,
    message
  };
}
// Signup Action
export function signUp(data:Object) {
  return (dispatch:Function) => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, `${API_BASE}/auth/signup`)
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(err.data.message));
      });
  };
}

/**
 * LOGOUT ACTIONS
 */
export const LOGOUT_USER:string = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS:string = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAIL:string = 'LOGOUT_USER_FAIL';

const beginLogout = () => {
  return { type: LOGOUT_USER };
};

export function logoutSuccess() {
  return { type: LOGOUT_USER_SUCCESS };
}

export function logoutError() {
  return { type: LOGOUT_USER_FAIL };
}

// Logout Action
export function logOut() {
  return (dispatch:Function) => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, `${API_BASE}/auth/logout`)
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

/**
 * TOKEN CHECK ACTIONS
 */
export const CHECK_TOKEN_VALIDITY_REQUEST = 'CHECK_TOKEN_VALIDITY_REQUEST';
export const TOKEN_VALID = 'TOKEN_VALID';
export const TOKEN_INVALID_OR_MISSING = 'OKEN_INVALID_OR_MISSING';

function checkTokenValidityRequest() {
  return { type: CHECK_TOKEN_VALIDITY_REQUEST };
}

function checkTokenValiditySuccess(response) {
  return {
    type: TOKEN_VALID,
    payload: response.data
  };
}

function checkTokenValidityFailure(error) {
  return {
    type: TOKEN_INVALID_OR_MISSING,
    payload: error
  };
}

export function checkTokenValidity() {
  return (dispatch:Function) => {
    const token = localStorage.getItem('boldr:jwt');
    if (!token || token === '') { return; }
    dispatch(checkTokenValidityRequest());
    request.get(`${API_BASE}/auth/check`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      dispatch(checkTokenValiditySuccess(response));
    })
    .catch(() => {
      dispatch(checkTokenValidityFailure('Token is invalid'));
      localStorage.removeItem('boldr:jwt');
    });
  };
}

/**
 * INITIAL STATE
 */
export const INITIAL_STATE = {
  message: '',
  isLoading: false,
  authenticated: false,
  token: undefined,
  users: [],
  currentUser: {}
};

/**
 * User Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function user(state:Object = INITIAL_STATE, action:Object = {}) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        message: ''
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: true,
        message: '',
        token: action.payload
      });
    case LOGIN_USER_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: false,
        message: action.message
      });
    case CHECK_TOKEN_VALIDITY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        message: '',
        authenticated: false,
        token: ''
      });
    case TOKEN_VALID:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: true,
        message: '',
        token: action.payload
      });
    case TOKEN_INVALID_OR_MISSING:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: false,
        message: action.message,
        token: ''
      });
    case SIGNUP_USER_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        message: ''
      });
    case SIGNUP_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: true
      });
    case SIGNUP_USER_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: false,
        message: action.message
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isLoading: true,
        message: ''
      });
    case LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: false
      });
    case LOGOUT_USER_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        authenticated: true
      });
    default:
      return state;
  }
}
