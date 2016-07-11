import axios from 'axios';
import { API_USERS } from 'shared/config.api';


export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAIL = 'LOAD_USERS_FAIL';

const loadUsers = () => ({
  type: LOAD_USERS_REQUEST
});

const loadUsersSuccess = (response) => ({
  type: LOAD_USERS_SUCCESS,
  isLoading: false,
  payload: response.data
});

// Fail receivers
const failedToLoadUsers = (data) => ({
  type: LOAD_USERS_FAIL,
  isLoading: false,
  data
});

// Public action creators
export function loadSiteUsers(data) {
  return dispatch => {
    dispatch(loadUsers());
    return axios.get(`${API_USERS}`, {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(loadUsersSuccess(response));
        }
      })
      .catch(err => {
        dispatch(failedToLoadUsers(err));
      });
  };
}

const INITIAL_STATE = {
  isLoading: false,
  users: [],
  error: undefined
};

export default function siteUsers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_USERS_REQUEST:
      return {
        ...state,
        isLoading: false
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case LOAD_USERS_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
