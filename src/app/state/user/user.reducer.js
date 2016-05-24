import _debug from 'debug';
import * as constants from './user.constants';

const debug = _debug('user.reducer:debug');

export const INITIAL_USER_STATE = {
  loading: false,
  message: '',
  error: false,
  userId: '',
  profile: {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    avatar: '',
    role: ''
  },
  users: []
};

export default function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        userId: action.user.userId,
        profile: {
          email: action.user.email,
          username: action.user.username,
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          avatar: action.user.avatar,
          role: action.user.role
        }
      };
    case constants.PARTIAL_POPULATE_USER:
      return {
        ...state,
        loading: false,
        error: false,
        userId: action.user.userId
      };
    case constants.REQUEST_USERS:
      return {
        ...state,
        loading: true,
        error: null,
        users: action.payload
      };
    case constants.RECEIVE_USERS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload
      };
    case constants.RECEIVE_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
      };
    default:
      return state;
  }
}
