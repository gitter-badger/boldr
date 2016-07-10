import { beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import expect from 'expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import reducer, {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAIL } from '../article';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Article reducer', () => {
  const initialState = {
    isLoading: false,
    error: undefined,
    message: '',
    articles: []
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle FETCH_ARTICLES_REQUEST', () => {
    expect(
      reducer(undefined, { type: FETCH_ARTICLES_REQUEST })
    ).toEqual(Object.assign({}, initialState, {
      isLoading: true,
      error: undefined,
      message: '',
      articles: []
    }));
  });
});
