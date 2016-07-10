import { beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import expect from 'expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import reducer, {
LOGIN_USER_REQUEST,
LOGIN_USER_SUCCESS,
LOGIN_USER_FAIL,
SIGNUP_USER_REQUEST,
SIGNUP_USER_SUCCESS,
SIGNUP_USER_FAIL,
LOGOUT_USER,
LOGOUT_USER_SUCCESS,
LOGOUT_USER_FAIL, manualLogin } from '../user';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Users Async Actions', () => {
  let sandbox;

  const initialState = {
    message: '',
    isLoading: false,
    authenticated: false,
    token: undefined,
    users: [],
    currentUser: {}
  };

  const response = {
    data: {
      message: 'Success'
    },
    status: 200
  };

  const data = {
    email: 'test@test.com',
    password: 'password'
  };

  const errMsg = {
    data: {
      message: 'Oops! Something went wrong!'
    }
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create(); // eslint-disable-line
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('User Login', () => {
    it('dispatches LOGIN_USER_REQUEST and LOGIN_USER_SUCCESS when Login returns status of 200 and routes user to /', (done) => {
      const expectedActions = [
        {
          type: LOGIN_USER_REQUEST
        },
        {
          type: LOGIN_USER_SUCCESS,
          payload: response.data
        },
        {
          payload: {
            args: ['/'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }];

      sandbox.stub(axios, 'post').returns(Promise.resolve(response));

      const store = mockStore(initialState);
      store.dispatch(manualLogin(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });
  });
});

describe('Users reducer', () => {
  const initialState = {
    message: '',
    isLoading: false,
    authenticated: false,
    token: undefined,
    users: [],
    currentUser: {}
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle LOGIN_USER_REQUEST', () => {
    expect(
      reducer(undefined, { type: LOGIN_USER_REQUEST })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: true,
      message: '',
      token: undefined
    }));
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    expect(
      reducer(undefined, { type: LOGIN_USER_SUCCESS })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: false,
      authenticated: true,
      message: ''
    }));
  });

  it('should handle LOGIN_USER_FAIL', () => {
    const message = 'Success';
    expect(
      reducer(undefined, { type: LOGIN_USER_FAIL, message })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: false,
      authenticated: false,
      message
    }));
  });

  it('should handle SIGNUP_USER_REQUEST', () => {
    expect(
      reducer(undefined, { type: SIGNUP_USER_REQUEST })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: true,
      message: ''
    }));
  });

  it('should handle SIGNUP_USER_SUCCESS', () => {
    expect(
      reducer(undefined, { type: SIGNUP_USER_SUCCESS })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: false,
      authenticated: true
    }));
  });

  it('should handle SIGNUP_USER_FAIL', () => {
    const message = 'Oops! Something went wrong!';
    expect(
      reducer(undefined, { type: SIGNUP_USER_FAIL, message })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: false,
      authenticated: false,
      message
    }));
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      reducer(undefined, { type: LOGOUT_USER })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: true,
      message: ''
    }));
  });

  it('should handle LOGOUT_USER_SUCCESS', () => {
    expect(
      reducer(undefined, { type: LOGOUT_USER_SUCCESS })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: false,
      authenticated: false
    }));
  });

  it('should handle LOGOUT_USER_FAIL', () => {
    expect(
      reducer(undefined, { type: LOGOUT_USER_FAIL })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: false,
      authenticated: true
    }));
  });
});
