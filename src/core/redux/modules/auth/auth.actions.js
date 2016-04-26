import { login } from '../api';
import * as actions from './auth.constants';

export const submitLogin = () => ({
  type: actions.LOGIN_SUBMIT
});

export const loginFailed = data => ({
  type: actions.LOGIN_FAILED,
  data
});

export const loginSucceed = json => ({
  type: actions.LOGIN_SUCCESS,
  json
});

export const loginRequest = (username, password) => dispatch => {
  dispatch(submitLogin());
  return login(username, password, loginSucceed, loginFailed);
};
