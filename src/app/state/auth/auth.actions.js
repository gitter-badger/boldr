import axios from 'axios';
import { push } from 'react-router-redux';
import { partialPopulateUser } from '../user/user.actions';
import * as types from './auth.constants';
import { API_BASE } from 'app/config.api';

// Log In Action Creators
function beginLogin() {
  return {
    type: types.LOGIN_USER_REQUEST
  };
}

export function loginSuccess(response) {
  localStorage.setItem('boldr:jwt', response.data.token);
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: response.data,
    message: response.data.message
  };
}

function loginError(err) {
  return {
    type: types.LOGIN_USER_FAILURE,
    message: err.error
  };
}

// Sign Up Action Creators
function signUpError(response) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message: response.error
  };
}

function beginSignUp() {
  return {
    type: types.SIGNUP_USER
  };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

// Log Out Action Creators
function beginLogout() {
  return {
    type: types.LOGOUT_USER
  };
}

function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS_USER
  };
}

function logoutError() {
  return {
    type: types.LOGOUT_ERROR_USER
  };
}

export function toggleLoginMode() {
  return {
    type: types.TOGGLE_LOGIN_MODE
  };
}

export function authLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return axios.post(`${API_BASE}/auth/login`, data)
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response));
          dispatch(partialPopulateUser(response));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
}

export function authRegister(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return axios.post(`${API_BASE}/auth/register`, data)
      .then(response => {
        if (response.status === 201) {
          dispatch(signUpSuccess(response));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(err));
      });
  };
}

export function logout() {
  return dispatch => {
    dispatch(beginLogout());

    return axios.post(`${API_BASE}/auth/logout`, null)
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

export function checkTokenValidityRequest() {
  return { type: types.CHECK_TOKEN_VALIDITY_REQUEST };
}

export function checkTokenValiditySuccess(response) {
  return {
    type: types.SIGNIN_USER_SUCCESS,
    payload: response
  };
}

export function checkTokenValidityFailure(error) {
  return {
    type: types.SIGNIN_USER_FAILURE,
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
export function checkAuth() {
  if (localStorage.getItem('boldr:jwt')) {
    return true;
  }
  return false;
}
export function meFromToken(response) {
  // check if the token is still valid, if so, get user from the server
  axios.get(`${API_BASE}/auth/check`);

  return {
    type: types.ME_FROM_TOKEN,
    payload: response
  };
}

export function meFromTokenSuccess(currentUser) {
  return {
    type: types.ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  return {
    type: types.ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}


export function resetToken() {
  return {
    type: types.RESET_TOKEN
  };
}
