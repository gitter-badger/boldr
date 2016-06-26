import axios from 'axios';
import { push } from 'react-router-redux';
import { API_BASE } from 'app/config.api';

const TOGGLE_SIDE_BAR = '@@boldr/TOGGLE_SIDE_BAR';
const CHANGE_SELECTED_DRAWER_ITEM = '@@boldr/CHANGE_SELECTED_DRAWER_ITEM';
const DONE_LOADING = '@@boldr/DONE_LOADING';
const LOAD_SETTINGS = '@@boldr/LOAD_SETTINGS';
const LOAD_SETTINGS_SUCCESS = '@@boldr/LOAD_SETTINGS_SUCCESS';
const LOAD_SETTINGS_FAILURE = '@@boldr/LOAD_SETTINGS_FAILURE';
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

const changeSelectedDrawerMenuListItem = (index, title) => {
  return {
    type: CHANGE_SELECTED_DRAWER_ITEM,
    index,
    title
  };
};

export const routeToIndex = (index) => {
  return (dispatch) => {
    setTimeout(() => {
      let path = null;
      let title = null;
      switch (index) {
        case 1:
          path = '/home';
          title = 'Home';
          break;
        case 2:
          path = '/blog';
          title = 'Blog';
          break;
        case 3:
          path = '/dashboard';
          title = 'Dashboard';
          break;
        case 4:
          path = '/dashboard/articles';
          title = 'Dashboard';
          break;
        case 5:
          path = '/dashboard/articles';
          title = 'List all articles';
          break;
        case 6:
          path = '/dashboard/articles/create';
          title = 'Create new article';
          break;
        case 7:
          path = '/dashboard/settings';
          title = 'Settings';
          break;
        case 8:
          path = '/dashboard/pages';
          title = 'Pages';
          break;
        case 9:
          path = '/dashboard/users';
          title = 'Users';
          break;
        case 10:
          path = '/dashboard/collections';
          title = 'Collections';
          break;
        case 11:
          path = '/dashboard/uploader';
          title = 'Uploader';
          break;
        default:
          path = '/404';
      }

      if (path === null || path === '/404') {
        return dispatch(push(path));
      }

      dispatch(changeSelectedDrawerMenuListItem(index, title));
      dispatch(push(path));
      return;
    }, 500);
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
