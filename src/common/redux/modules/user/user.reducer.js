import _debug from 'debug';
import * as constants from './user.constants';

const debug = _debug('user.reducer:debug');

export const INITIAL_STATE = {
  loading: false,
  message: '',
  error: false,
  profile: {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    avatar: '',
    role: ''
  }
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        profile: {
          email: action.user.email,
          username: action.user.username,
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          avatar: action.user.avatar,
          role: action.user.role
        }
      };
    default:
      return state;
  }
}
