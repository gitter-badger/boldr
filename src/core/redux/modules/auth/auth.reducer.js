import { LOGIN_SUBMIT, LOGIN_FAILED, LOGIN_SUCCESS } from './auth.constants';
import { createTokenCookie } from './auth.actions';

const message = statusCode => {
  switch (statusCode) {
    case 401:
      return '';
    case 404:
      return '';
    case 410:
      return 'Your session has expired, please login again.';
    case 500:
      return 'Internal authorization error';
    default:
      return 'Login failed';
  }
};
const INITIAL_STATE = {
  isLogging: false,
  error: {
    message: '',
    code: 0
  }
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUBMIT:
      return {
        ...state,
        isLogging: true,
        error: {
          message: '',
          code: 0
        }
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: {
          message: message(action.data.status),
          code: action.data.status
        },
        isLogging: false
      };
    case LOGIN_SUCCESS:
      createTokenCookie(action.json.token);
      return {
        ...state,
        error: {
          message: '',
          code: 0
        },
        isLogging: false
      };
    default:
      return state;
  }
};

export default AuthReducer;

