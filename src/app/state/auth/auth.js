import axios from 'axios';
import { push } from 'react-router-redux';
import { partialPopulateUser } from '../user/user';
import { API_BASE } from 'app/config.api';

// Log In Action Types
const TOGGLE_LOGIN_MODE = 'TOGGLE_LOGIN_MODE';
const LOGIN_USER = 'LOGIN_USER';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

// Log In Action Creators
function beginLogin() {
  return {
    type: LOGIN_USER
  };
}

const loginSuccess = response => {
  localStorage.setItem('boldr:jwt', response.data.token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: response.data
  };
};

const loginError = err => {
  return {
    type: LOGIN_USER_FAIL,
    payload: err.error
  };
};

export function loginUser(data) {
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

// Register User Action Types
const REGISTER_USER = 'REGISTER_USER';
const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

// Register User Action Creators
function beginRegistration() {
  return {
    type: REGISTER_USER
  };
}

const registerUserSuccess = response => {
  localStorage.setItem('boldr:jwt', response.data.token);
  return {
    type: REGISTER_USER_SUCCESS,
    payload: response.data
  };
};

const registerUserFail = err => {
  return {
    type: REGISTER_USER_FAIL,
    payload: err.error
  };
};

export function registerUser(data) {
  return dispatch => {
    dispatch(beginRegistration());

    return axios.post(`${API_BASE}/auth/register`, data)
      .then(response => {
        if (response.status === 200) {
          dispatch(registerUserSuccess(response));
          dispatch(push('/login'));
        } else {
          dispatch(registerUserFail('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(registerUserFail(err));
      });
  };
}

// Register User Action Types
const LOGOUT_USER = 'LOGOUT_USER';
const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
const LOGOUT_USER_FAIL = 'LOGOUT_USER_FAIL';

// Register User Action Creators
function beginLogout() {
  return {
    type: LOGOUT_USER
  };
}

const logoutUserSuccess = () => {
  localStorage.removeItem('boldr:jwt');
  return {
    type: LOGOUT_USER_SUCCESS
  };
};

const logoutUserFail = err => {
  return {
    type: LOGOUT_USER_FAIL
  };
};

export function logoutUser() {
  return dispatch => {
    dispatch(beginLogout());

    return axios.post(`${API_BASE}/auth/logout`)
      .then(response => {
        dispatch(logoutUserSuccess());
        dispatch(push('/'));
      })
      .catch(err => {
        dispatch(logoutUserFail(err));
      });
  };
}


const CHECK_TOKEN_VALIDITY_REQUEST = '@@user/CHECK_TOKEN_VALIDITY_REQUEST';
const TOKEN_VALID = '@@user/TOKEN_VALID';
const TOKEN_INVALID_OR_MISSING = '@@user/TOKEN_INVALID_OR_MISSING';

function checkTokenValidityRequest() {
  return { type: CHECK_TOKEN_VALIDITY_REQUEST };
}

function checkTokenValiditySuccess(response) {
  return {
    type: TOKEN_VALID,
    payload: response
  };
}

function checkTokenValidityFailure(error) {
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


const INITIAL_STATE = {
  isLoading: false,
  error: undefined,
  isAuthenticated: false,
  token: '',
  userRole: '',
  userId: ''
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODE:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
        userId: action.payload.user.id
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        isLoading: false,
        userId: -1,
        token: ''
      };
    case REGISTER_USER:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
        userId: action.payload.user.id
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        isLoading: false,
        userId: -1,
        token: ''
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: '',
        userId: ''
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case CHECK_TOKEN_VALIDITY_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: ''
      };
    case TOKEN_VALID:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case TOKEN_INVALID_OR_MISSING:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.token;
}
