import * as constants from './auth.constants';
// import { createTokenCookie } from './auth.actions';

export const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  isAuthenticated: false,
  isAuthenticating: false,
  token: {}
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
        error: null,
        isAuthenticating: true,
        isAuthenticated: false,
        loading: true,
        message: 'Logging in.',
        token: {}
      };
    case constants.LOGIN_USER_SUCCESS:
      return {
        ...state,
        error: null,
        isAuthenticating: false,
        isAuthenticated: true,
        loading: true,
        message: 'Logged in successfully.',
        token: action.payload
      };
    case constants.LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticating: true,
        isAuthenticated: false,
        loading: false,
        message: action.message
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
