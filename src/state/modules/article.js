/* @flow */
import { polyfill } from 'es6-promise';
import axios from 'axios';
import { push } from 'react-router-redux';

import { API_ARTICLES } from '../../config.api';

polyfill();

function makeArticleRequest(method, data, api = `${API_ARTICLES}`) {
  return axios[method](api, data);
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
// Fetch Articles Success
export function fetchedArticles(response:Object) {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    payload: response.data
  };
}
// Fetch Articles Error
export function errorFetchingArticles(err:Object) {
  return {
    type: FETCH_ARTICLES_FAIL,
    error: err.data
  };
}
// Fetch Articles Action
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

/**
 * GET ARTICLE ACTIONS
 */
export const CREATE_ARTICLE_REQUEST:string = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS:string = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAIL:string = 'CREATE_ARTICLE_FAIL';

const beginCreateArticle = () => {
  return { type: CREATE_ARTICLE_REQUEST };
};
// Fetch Articles Success
export function createArticleSuccess(response:Object) {
  return {
    type: CREATE_ARTICLE_SUCCESS,
    payload: response.data
  };
}
// Fetch Articles Error
export function errorCreatingArticle(err:Object) {
  return {
    type: CREATE_ARTICLE_FAIL,
    error: err.data
  };
}
// Fetch Articles Action
export function createArticle(articleData:Object) {
  return (dispatch:Function) => {
    dispatch(beginCreateArticle());

    return axios({ method: 'post', url: `${API_ARTICLES}`, headers: {
      'Authorization': `Bearer ${localStorage.getItem('boldr:jwt')}`
    }, data: {
      title: articleData.title,
      content: articleData.content,
      tags: [
    { tagname: articleData.tag }
      ], status: articleData.status } })
      .then(response => {
        if (response.status === 201) {
          dispatch(createArticleSuccess(response));
        }
      })
      .catch(err => {
        dispatch(errorCreatingArticle(err));
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
    case CREATE_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    case CREATE_ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    case CREATE_ARTICLE_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    default:
      return state;
  }
}
