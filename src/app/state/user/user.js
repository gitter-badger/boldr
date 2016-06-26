import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { API_BASE } from 'app/config.api';

export const LOCAL_STORAGE_KEY = 'boldr:user';
const PARTIAL_POPULATE_USER = '@@user/PARTIAL_POPULATE_USER';

export const USERS_ENDPOINT = `${API_BASE}/users`;

export function partialPopulateUser() {
  const jwt = localStorage.getItem('boldr:jwt');
  const user = jwtDecode(jwt);
  return {
    type: PARTIAL_POPULATE_USER,
    user
  };
}

const GET_USERS = '@@user/GET_USERS';
const GET_USERS_SUCCESS = '@@user/GET_USERS_SUCCESS';
const GET_USERS_FAIL = '@@user/GET_USERS_FAIL';

const requestUsers = () => ({
  type: GET_USERS
});

const usersReceived = (response) => ({
  type: GET_USERS_SUCCESS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToReceiveUsers = (data) => ({
  type: GET_USERS_FAIL,
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

const REQUEST_USER = '@@user/REQUEST_USER';
const RECEIVE_USER = '@@user/RECEIVE_USER';
const RECEIVE_USER_FAILED = '@@user/RECEIVE_USER_FAILED';

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

const INITIAL_STATE = {
  isLoading: false,
  isAuthenticated: false,
  message: '',
  error: undefined,
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  avatar: '',
  acl: '',
  users: []
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PARTIAL_POPULATE_USER:
      return {
        ...state,
        loading: false,
        error: false,
        id: action.user.id
      };
    case GET_USERS:
      return {
        ...state,
        loading: true,
        error: null,
        users: action.payload
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
      };
    case REQUEST_USER:
      return {
        ...state,
        loading: true,
        error: null
      };
    case RECEIVE_USER:
      return {
        ...state,
        loading: false,
        error: null,
        id: action.payload.id,
        email: action.payload.email,
        firstname: action.payload.profile.firstname,
        lastname: action.payload.profile.lastname,
        website: action.payload.profile.website,
        avatar: action.payload.profile.avatar
      };
    case RECEIVE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CHECK_TOKEN_VALIDITY_REQUEST:
      return {
        ...state,
        loading: true,
        message: ''
      };
    case TOKEN_VALID:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: ''
      };
    case TOKEN_INVALID_OR_MISSING:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        message: action.message
      };
    default:
      return state;
  }
}
