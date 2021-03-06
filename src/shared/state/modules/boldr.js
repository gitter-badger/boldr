import axios from 'axios';
import { API_BASE } from '../../config.api';

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
  siteName: response.data[0].siteName,
  description: response.data[0].description,
  logo: response.data[0].logo,
  siteUrl: response.data[0].siteUrl,
  favicon: response.data[0].favicon,
  analyticsId: response.data[0].analyticsId,
  allowRegistration: response.data[0].allowRegistration
});

// Fail receivers
const failedToLoadSettings = (data) => ({
  type: LOAD_SETTINGS_FAILURE,
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
const SAVE_SETUP_REQUEST = 'SAVE_SETUP_REQUEST';
const SAVE_SETUP_SUCCESS = 'SAVE_SETUP_SUCCESS';
const SAVE_SETUP_FAIL = 'SAVE_SETUP_FAIL';

const startSaveSetup = () => ({
  type: SAVE_SETUP_REQUEST
});

const saveSetupSuccess = (response) => ({
  type: SAVE_SETUP_SUCCESS,
  payload: response.data,
  message: 'Boldr did its thing, now you do yours.'
});

// Fail receivers
const failedToSaveSetup = (data) => ({
  type: SAVE_SETUP_FAIL,
  data
});

// Public action creators
export function saveBoldrSetup(data) {
  return dispatch => {
    dispatch(startSaveSetup());
    return axios.post(`${SETTINGS_ENDPOINT}`, data, {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 201) {
          dispatch(saveSetupSuccess(response));
          dispatch(loadSettings());
        }
      })
      .catch(err => {
        dispatch(failedToSaveSetup(err));
      });
  };
}

const INITIAL_STATE = {
  isLoading: false,
  siteName: '',
  description: '',
  logo: '',
  siteUrl: '',
  favicon: '',
  analyticsId: '',
  allowRegistration: ''
};

export default function boldr(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DONE_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case LOAD_SETTINGS:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        siteName: action.siteName,
        description: action.description,
        logo: action.logo,
        siteUrl: action.siteUrl,
        favicon: action.favicon,
        analyticsId: action.analyticsId,
        allowRegistration: action.allowRegistration,
        message: action.message
      };
    case LOAD_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case SAVE_SETUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SAVE_SETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: action.payload,
        message: action.message
      };
    case SAVE_SETUP_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
