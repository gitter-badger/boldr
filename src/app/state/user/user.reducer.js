import * as constants from './user.actions';

export const INITIAL_USER_STATE = {
  loading: false,
  isAuthenticated: false,
  message: '',
  error: false,
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  avatar: '',
  acl: '',
  users: []
};

export default function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        id: action.user.id
      };
    case constants.PARTIAL_POPULATE_USER:
      return {
        ...state,
        loading: false,
        error: false,
        id: action.user.id
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
    case constants.REQUEST_USER:
      return {
        ...state,
        loading: true,
        error: null
      };
    case constants.RECEIVE_USER:
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
    case constants.RECEIVE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
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
        isAuthenticated: false,
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
