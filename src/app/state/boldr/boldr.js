import axios from 'axios';
import { API_BASE } from 'app/config.api';

const TOGGLE_SIDE_BAR = '@@boldr/TOGGLE_SIDE_BAR';
const DONE_LOADING = '@@boldr/DONE_LOADING';
const LOAD_SETTINGS = '@@boldr/LOAD_SETTINGS';
const LOAD_SETTINGS_SUCCESS = '@@boldr/LOAD_SETTINGS_SUCCESS';
const LOAD_SETTINGS_FAILURE = '@@boldr/LOAD_SETTINGS_FAILURE';
const SETTINGS_ENDPOINT = `${API_BASE}/settings`;
const SNACK_MESSAGE = 'SNACK_MESSAGE';
const CLOSE_SNACK = 'CLOSE_SNACK';
const SOCKET_STATUS = 'SOCKET_STATUS';

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

export const closeSnack = () => {
  return function(dispatch) {
    dispatch({
      type: CLOSE_SNACK,
    })
  }
}

const INITIAL_STATE = {
  isLoading: true,
  isSideBarOpen: false,
  selectedDrawerMenuListItem: 1,
  error: false,
  title: 'Boldr',
  url: '',
  analyticsId: '',
  sitename: '',
  logo: '',
  snack: {
    open: false,
    message: null,
    author: null,
    name: null
  }
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
    case SNACK_MESSAGE:
      const snack = {
        open: true,
        message: action.message,
        author: action.author,
        name: action.name
      };
      return { ...state, snack };
    case CLOSE_SNACK:
      return {
        ...state,
        snack: { ...INITIAL_STATE.snack }
      };
    default:
      return state;
  }
}
