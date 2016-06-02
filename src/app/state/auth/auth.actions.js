import axios from 'axios';
import { push } from 'react-router-redux';
import { partialPopulateUser } from '../user/user.actions';
import * as types from './auth.constants';
const API_URL = '/api/v1';
import cookie from 'react-cookie';
/**
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * @param  {String} method HTTP method POST, GET, DELETE
 * @param  {Object} data   What you pass to the server
 * @param  {String} api    Endpoint /login
 * @return {Promise}
 */
function makeAuthRequest(method, data, api) {
  return request({
    url: api,
    method,
    data,
    withCredentials: true
  });
}

// Log In Action Creators
function beginLogin() {
  return {
    type: types.LOGIN_USER_REQUEST
  };
}

export function loginSuccess(response) {
  localStorage.setItem('boldr:jwt', response.data.token);
  cookie.save('boldr:jwt', response.data.token);
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

    return axios.post('/api/v1/auth/login', data)
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

    return axios.post('/api/v1/auth/register', data)
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

    return axios.post('/api/v1/auth/logout', null)
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
    axios.get(`${API_URL}/auth/check`, {
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
  axios.get('/api/v1/auth/check');

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
