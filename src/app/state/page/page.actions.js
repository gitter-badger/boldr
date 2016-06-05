import { polyfill } from 'es6-promise';
import axios from 'axios';
import { push } from 'react-router-redux';
import { API_BASE } from 'core/api';

polyfill();

export const SET_PAGE = '@@pages/SET_PAGE';
export const LOAD_PAGES = '@@pages/LOAD_PAGES';
export const LOAD_PAGES_SUCCESS = '@@pages/LOAD_PAGES_SUCCESS';
export const LOAD_PAGES_FAILURE = '@@pages/LOAD_PAGES_FAILURE';

export const PAGES_ENDPOINT = `${API_BASE}/pages`;

const loadPages = () => ({
  type: LOAD_PAGES
});

const loadPagesSuccess = (response) => ({
  type: LOAD_PAGES_SUCCESS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToLoadPages = (data) => ({
  type: LOAD_PAGES_FAILURE,
  loading: false,
  data
});

// Public action creators
export function getPagesList(data) {
  return dispatch => {
    dispatch(loadPages());
    return axios.get(`${PAGES_ENDPOINT}`, {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(loadPagesSuccess(response));
        } else {
          dispatch(failedToLoadPages('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToLoadPages(err));
      });
  };
}
