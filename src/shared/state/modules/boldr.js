import axios from 'axios';
import { API_BASE } from 'shared/config.api';

const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR';
const DONE_LOADING = 'DONE_LOADING';
const LOAD_SETTINGS = 'LOAD_SETTINGS';
const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
const LOAD_SETTINGS_FAILURE = 'LOAD_SETTINGS_FAILURE';
const SETTINGS_ENDPOINT = `${API_BASE}/settings`;

export const finishLoading = status => {
  return {
    type: DONE_LOADING
  };
};

export const toggleSideBar = () => {
  return {
    type: TOGGLE_SIDE_BAR
  };
};

const loadSettings = () => ({
  type: LOAD_SETTINGS
});

const loadSettingsSuccess = (response) => ({
  type: LOAD_SETTINGS_SUCCESS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToLoadSettings = (data) => ({
  type: LOAD_SETTINGS_FAILURE,
  loading: false,
  data
});

// Public action creators
export function loadBoldrSettings(data) {
  return dispatch => {
    dispatch(loadSettings());
    return axios.get(`${SETTINGS_ENDPOINT}`, {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(loadSettingsSuccess(response));
        } else {
          dispatch(failedToLoadSettings('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadSettings(err));
      });
  };
}

const INITIAL_STATE = {
  isLoading: true,
  isSideBarOpen: false,
  selectedDrawerMenuListItem: 1
};

export default function boldr(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DONE_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen
      };
    default:
      return state;
  }
}
