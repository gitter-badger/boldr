import _debug from 'debug';
import * as constants from './post.constants';

const debug = _debug('pot.reducer:debug');

export const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  filter: {},
  editPostId: -1,
  authors: [],
  categories: [],
  posts: [],
  post: {}
};

export default function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.REQUEST_POSTS:
      return {
        ...state,
        loading: true
      };
    case constants.RECEIVE_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    default:
      return state;
  }
}
