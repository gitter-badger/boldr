import axios from 'axios';
import { API_BASE } from 'app/config.api';

export const SET_PAGE = '@@pages/SET_PAGE';
export const LOAD_PAGES = '@@pages/LOAD_PAGES';
export const LOAD_PAGES_SUCCESS = '@@pages/LOAD_PAGES_SUCCESS';
export const LOAD_PAGES_FAIL = '@@pages/LOAD_PAGES_FAIL';

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
  type: LOAD_PAGES_FAIL,
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

const INITIAL_STATE = {
  isLoading: false,
  message: '',
  error: false,
  pages: []
};

export default function page(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state
      };
    case LOAD_PAGES:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_PAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pages: action.payload.pages
      };
    case LOAD_PAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: 'There was a problem loading pages'
      };
    default:
      return state;
  }
}
