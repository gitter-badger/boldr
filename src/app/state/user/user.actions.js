import { polyfill } from 'es6-promise';
import axios from 'axios';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { API_BASE } from 'app/config.api';
polyfill();

export const SET_USER = '@@user/SET_USER';
export const CLEAR_USER = '@@user/CLEAR_USER';
export const UPDATE_USER_REQUEST = '@@user/UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = '@@user/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = '@@user/UPDATE_USER_FAILURE';
export const LOCAL_STORAGE_KEY = 'boldr:user';
export const PARTIAL_POPULATE_USER = '@@user/PARTIAL_POPULATE_USER';
export const REQUEST_USERS = '@@user/REQUEST_USERS';
export const RECEIVE_USERS = '@@user/RECEIVE_USERS';
export const RECEIVE_USERS_FAILED = '@@user/RECEIVE_USERS_FAILED';
export const REQUEST_USER = '@@user/REQUEST_USER';
export const RECEIVE_USER = '@@user/RECEIVE_USER';
export const RECEIVE_USER_FAILED = '@@user/RECEIVE_USER_FAILED';
export const TOGGLE_LOGIN_MODE = '@@user/TOGGLE_LOGIN_MODE';
export const MANUAL_LOGIN_USER = '@@user/MANUAL_LOGIN_USER';
export const LOGIN_SUCCESS_USER = '@@user/LOGIN_SUCCESS_USER';
export const LOGIN_ERROR_USER = '@@user/LOGIN_ERROR_USER';
export const SIGNUP_USER = '@@user/SIGNUP_USER';
export const SIGNUP_SUCCESS_USER = '@@user/SIGNUP_SUCCESS_USER';
export const SIGNUP_ERROR_USER = '@@user/SIGNUP_ERROR_USER';
export const LOGOUT_USER = '@@user/LOGOUT_USER';
export const LOGOUT_SUCCESS_USER = '@@user/LOGOUT_SUCCESS_USER';
export const LOGOUT_ERROR_USER = '@@user/LOGOUT_ERROR_USER';
export const CHECK_TOKEN_VALIDITY_REQUEST = '@@user/CHECK_TOKEN_VALIDITY_REQUEST';
export const TOKEN_VALID = '@@user/TOKEN_VALID';
export const TOKEN_INVALID_OR_MISSING = '@@user/TOKEN_INVALID_OR_MISSING';

export const USERS_ENDPOINT = `${API_BASE}/users`;

export function partialPopulateUser() {
  const jwt = localStorage.getItem('boldr:jwt');
  const user = jwtDecode(jwt);
  return {
    type: PARTIAL_POPULATE_USER,
    user
  };
}

const requestUsers = () => ({
  type: REQUEST_USERS
});

const usersReceived = (response) => ({
  type: RECEIVE_USERS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToReceiveUsers = (data) => ({
  type: RECEIVE_USERS_FAILED,
  loading: false,
  data
});

// Public action creators
export function getUsersList(data) {
  return dispatch => {
    dispatch(requestUsers());
    return axios.get(`${API_BASE}/users`, {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(usersReceived(response));
        } else {
          dispatch(failedToReceiveUsers('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToReceiveUsers(err));
      });
  };
}

function beginLogin() {
  return { type: MANUAL_LOGIN_USER };
}

function loginSuccess(response) {
  localStorage.setItem('boldr:jwt', response.data.token);
  return {
    type: LOGIN_SUCCESS_USER,
    response
  };
}

function loginError(message) {
  return {
    type: LOGIN_ERROR_USER,
    message
  };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return axios.post(`${API_BASE}/auth/login`, data)
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

function signUpError(message) {
  return {
    type: SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: SIGNUP_SUCCESS_USER,
    message
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return axios.post(`${API_BASE}/auth/register`, data)
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data));
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

function beginLogout() {
  return { type: LOGOUT_USER };
}

function logoutSuccess() {
  return { type: LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: TOGGLE_LOGIN_MODE };
}

export function logOut() {
  return dispatch => {
    localStorage.removeItem('boldr:jwt');
    dispatch(logoutSuccess());
  };
}

export function checkTokenValidityRequest() {
  return { type: CHECK_TOKEN_VALIDITY_REQUEST };
}

export function checkTokenValiditySuccess(response) {
  return {
    type: TOKEN_VALID,
    payload: response
  };
}

export function checkTokenValidityFailure(error) {
  return {
    type: TOKEN_INVALID_OR_MISSING,
    payload: error
  };
}

export function checkTokenValidity() {
  return dispatch => {
    const token = localStorage.getItem('boldr:jwt');
    if (!token || token === '') { return; }
    dispatch(checkTokenValidityRequest());
    axios.get(`${API_BASE}/auth/check`, {
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

const requestUser = () => ({
  type: REQUEST_USER
});

const userReceived = (response) => ({
  type: RECEIVE_USER,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToReceiveUser = (data) => ({
  type: RECEIVE_USER_FAILED,
  loading: false,
  data
});

// Public action creators
export function getUser(userId) {
  return dispatch => {
    dispatch(requestUser());
    return axios.get(`${API_BASE}/users/${userId}`, {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(userReceived(response));
        } else {
          dispatch(failedToReceiveUser('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToReceiveUser(err));
      });
  };
}
