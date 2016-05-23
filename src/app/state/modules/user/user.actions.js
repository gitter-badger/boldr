import * as types from './user.constants';
import axios from 'axios';

import jwtDecode from 'jwt-decode';
import cookie from 'react-cookie';
import { API_BASE } from 'app/api/index';
export const USERS_ENDPOINT = `${API_BASE}/users`;
const persistUser = (user) => {
  localStorage.setItem(types.LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const storedUser = localStorage.getItem(types.LOCAL_STORAGE_KEY);
  let user;

  if (storedUser) {
    user = JSON.parse(storedUser);
  } else {
    user = '';
  }

  return user;
};
export function partialPopulateUser() {
  const jwt = localStorage.getItem('boldr:jwt') || cookie.load('boldr:jwt');
  const user = jwtDecode(jwt);
  return {
    type: types.PARTIAL_POPULATE_USER,
    user
  };
}
const requestUsers = () => ({
  type: types.REQUEST_USERS
});
const usersReceived = (response) => ({
  type: types.RECEIVE_USERS,
  loading: false,
  payload: response.data
});
// Fail receivers
const feailedToReceiveUsers = (data) => ({
  type: types.RECEIVE_USERS_FAILED,
  loading: false,
  data
});

// Public action creators
export function getUsersList(data) {
  return dispatch => {
    dispatch(requestUsers());
    return axios.get('/api/v1/users', {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(usersReceived(response));
        } else {
          dispatch(feailedToReceiveUsers('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(feailedToReceiveUsers(err));
      });
  };
}
