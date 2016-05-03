import _debug from 'debug';
import * as constants from './post.constants';

const debug = _debug('pot.reducer:debug');

export const INITIAL_STATE = {
  loading: true,
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
    case constants.RECEIVE_POSTS_FAILED:
      return {
        ...state,
        loading: false
      };
    case constants.REQUEST_POST_BY_TITLE:
      return {
        ...state,
        loading: true
      };
    case constants.RECEIVE_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload]
      };
    case constants.FAILED_TO_RECEIVE_POST:
      return {
        ...state,
        loading: false
      };
    case constants.POST_DELETED:
      return {
        ...state,
        loading: false,
        posts: [...state.posts].filter((post) => post.id !== parseInt(action.id, 10))
      };
    case constants.POST_CREATED:
      return {
        ...state,
        loading: false,
        editPostId: action.payload.id
      };
    default:
      return state;
  }
}
