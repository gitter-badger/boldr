import request from 'axios';
import { push } from 'react-router-redux';
import { populateUser } from '../user/user.actions';
import * as types from './auth.constants';
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
  return { type: types.LOGIN_USER_REQUEST };
}

export function loginSuccess(response) {
  localStorage.setItem('jwt', response.data.token);
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
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER };
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function authLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeAuthRequest('post', data, '/api/v1/auth/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response));
          dispatch(populateUser(response));
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

    return makeAuthRequest('post', data, '/api/v1/auth/register')
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

    return makeAuthRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

export function meFromToken(tokenFromStorage) {
  // check if the token is still valid, if so, get user from the server
  request.get('/api/v1/auth/check');

  return {
    type: types.ME_FROM_TOKEN,
    payload: request
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
