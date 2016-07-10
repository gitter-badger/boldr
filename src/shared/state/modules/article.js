/* @flow */
import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import { API_ARTICLES } from '../../config.api';
polyfill();

function makeArticleRequest(method, data, api = `${API_ARTICLES}`) {
  return request[method](api, data);
}

/**
 * GET ARTICLE ACTIONS
 */
export const FETCH_ARTICLES_REQUEST:string = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS:string = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAIL:string = 'FETCH_ARTICLES_FAIL';

const beginFetchingArticles = () => {
  return { type: FETCH_ARTICLES_REQUEST };
};
// Login Success
export function fetchedArticles(response:Object) {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    payload: response.data
  };
}
// Login Error
export function errorFetchingArticles(err:Object) {
  return {
    type: FETCH_ARTICLES_FAIL,
    error: err.data
  };
}
// Login Action
export function fetchArticles(data:Object) {
  return (dispatch:Function) => {
    dispatch(beginFetchingArticles());

    return makeArticleRequest('get', data, `${API_ARTICLES}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchedArticles(response));
        }
      })
      .catch(err => {
        dispatch(errorFetchingArticles(err));
      });
  };
}


export const INITIAL_STATE = {
  isLoading: false,
  error: undefined,
  message: '',
  articles: []
};

/**
 * Article Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function article(state:Object = INITIAL_STATE, action:Object = {}) {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case FETCH_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        articles: action.payload
      });
    case FETCH_ARTICLES_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
}
