import * as constants from './auth.constants';

export const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  isAuthenticated: false,
  isAuthenticating: false,
  token: null
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.TOGGLE_LOGIN_MODE:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
        message: ''
      };
    case constants.LOGIN_USER_REQUEST:
      return {
        ...state,
        error: false,
        isAuthenticating: true,
        isAuthenticated: false,
        loading: true,
        message: 'Logging in.',
        token: {}
      };
    case constants.LOGIN_USER_SUCCESS:
      return {
        ...state,
        error: false,
        isAuthenticating: false,
        isAuthenticated: true,
        loading: false,
        message: 'Logged in successfully.',
        token: action.payload.token
      };
    case constants.LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticating: true,
        isAuthenticated: false,
        loading: false,
        message: 'There was a problem logging you in.'
      };
    case constants.CHECK_TOKEN_VALIDITY_REQUEST:
      return {
        ...state,
        error: false,
        isAuthenticating: true,
        isAuthenticated: false,
        loading: true,
        message: 'Verifying your token.'
      };
    case constants.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        error: false,
        isAuthenticating: false,
        isAuthenticated: true,
        loading: false,
        message: action.payload.data
      };
    case constants.SIGNIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload.data,
        isAuthenticating: false,
        isAuthenticated: false,
        loading: false,
        message: 'There was a problem logging you in.'
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  // This is invoked by routees.
  // globalState.user is the state of this current reducer.
  // we are checking if it does exists, and we should check if we have
  // the token
  return globalState.auth && globalState.auth.token;
}
