import _debug from 'debug';
import * as constants from './user.actions';

const debug = _debug('user.reducer:debug');

export const INITIAL_USER_STATE = {
  loading: false,
  isAuthenticated: false,
  message: '',
  error: false,
  userId: '',
  users: []
};

export default function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        userId: action.user.userId
      };
    case constants.PARTIAL_POPULATE_USER:
      return {
        ...state,
        loading: false,
        error: false,
        userId: action.user.userId
      };
    case constants.REQUEST_USERS:
      return {
        ...state,
        loading: true,
        error: null,
        users: action.payload
      };
    case constants.RECEIVE_USERS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload
      };
    case constants.RECEIVE_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
      };
    case constants.TOGGLE_LOGIN_MODE:
      return {
        ...state,
        isLogin: !state.isLogin,
        message: ''
      };
    case constants.MANUAL_LOGIN_USER:
      return {
        ...state,
        loading: true,
        message: ''
      };
    case constants.LOGIN_SUCCESS_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: ''
      };
    case constants.LOGIN_ERROR_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        message: action.message
      };
    case constants.SIGNUP_USER:
      return {
        ...state,
        loading: true,
        message: ''
      };
    case constants.SIGNUP_SUCCESS_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    case constants.SIGNUP_ERROR_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        message: action.message
      };
    case constants.LOGOUT_USER:
      return {
        ...state,
        loading: true,
        message: ''
      };
    case constants.LOGOUT_SUCCESS_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    case constants.LOGOUT_ERROR_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    case constants.CHECK_TOKEN_VALIDITY_REQUEST:
      return {
        ...state,
        loading: true,
        message: ''
      };
    case constants.TOKEN_VALID:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: ''
      };
    case constants.TOKEN_INVALID_OR_MISSING:
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
