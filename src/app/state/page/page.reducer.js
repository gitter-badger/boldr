import _debug from 'debug';
import * as constants from './page.actions';

const debug = _debug('pages.reducer:debug');

export const INITIAL_PAGE_STATE = {
  loading: false,
  message: '',
  error: false,
  pages: []
};

export default function page(state = INITIAL_PAGE_STATE, action) {
  switch (action.type) {
    case constants.SET_PAGE:
      return {
        ...state
      };
    case constants.LOAD_PAGES:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_PAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages
      };
    case constants.LOAD_PAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: 'There was a problem loading pages'
      };
    default:
      return state;
  }
}
