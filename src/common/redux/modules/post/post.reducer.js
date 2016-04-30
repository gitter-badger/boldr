import _debug from 'debug';
import * as constants from './post.constants';

const debug = _debug('pot.reducer:debug');

export const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  editPostId: -1,
  posts: []
};

export default function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.REQUEST_POSTS:
      return {
        ...state
      };
    default:
      return state;
  }
}
