import expect from 'expect';
import reducer from './user';

describe('Users reducer', () => {
  const INITIAL_STATE = {
    isLoading: false,
    isAuthenticated: false,
    message: '',
    error: undefined,
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    avatar: '',
    acl: '',
    users: []
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE);
  });
  it('should handle GET_USERS', () => {
    expect(
      reducer(undefined, { type: reducer.GET_USERS })
    ).toEqual(...INITIAL_STATE, {
      isLoading: false,
      isAuthenticated: false,
      message: '',
      error: undefined,
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      avatar: '',
      acl: '',
      users: []
    });
  });
});
