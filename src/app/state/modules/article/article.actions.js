import axios from 'axios';
import * as types from './article.constants';
import { getArticleByTitle, createArticleCall, updateArticleCall } from 'app/api/articleEndpoint';
import configureStore from 'app/state/store';

const store = configureStore();

const requestArticles = () => ({
  type: types.REQUEST_ARTICLES
});

const requestArticleByTitle = (title) => ({
  type: types.REQUEST_ARTICLE_BY_TITLE,
  title
});

const creatingArticle = () => ({
  type: types.CREATE_ARTICLE
});

const updatingArticle = () => ({
  type: types.UPDATE_ARTICLE
});

// Success receivers
const articlesReceived = (response) => ({
  type: types.RECEIVE_ARTICLES,
  loading: false,
  payload: response.data
});

const articleReceived = (response) => ({
  type: types.RECEIVE_ARTICLE,
  loading: false,
  payload: response.data
});

const articleCreated = (response) => ({
  type: types.ARTICLE_CREATED,
  loading: false,
  payload: response.data
});

const articleUpdated = (response) => ({
  type: types.ARTICLE_UPDATED,
  loading: false,
  payload: response.data
});

const articleDeleted = (id) => ({
  type: types.ARTICLE_DELETED,
  id
});

// Fail receivers
const failedToReceiveArticles = (data) => ({
  type: types.RECEIVE_ARTICLES_FAILED,
  loading: false,
  data
});

const failedToReceiveArticle = (data) => ({
  type: types.FAILED_TO_RECEIVE_ARTICLE,
  loading: false,
  data
});

const failedToCreateArticle = (data) => ({
  type: types.ARTICLE_CREATE_FAILED,
  loading: false,
  data
});

const failedToUpdateArticle = (data) => ({
  type: types.ARTICLE_UPDATE_FAILED,
  loading: false,
  data
});

// Public action creators
export function fetchArticles(data) {
  return dispatch => {
    dispatch(requestArticles());
    return axios.get('/api/v1/articles', {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(articlesReceived(response));
        } else {
          dispatch(failedToReceiveArticles('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToReceiveArticles(err));
      });
  };
}

export const getOrFetchArticle = (title) => dispatch => {
  const article = store.getState().article.articles.filter((x) => x.title === title);
  if (article.length === 0) {
    dispatch(fetchArticleByTitle(title));
  } else {
    dispatch(articleReceived(article[0]));
  }
};

export const fetchArticleByTitle = (articleTitle) => dispatch => {
  dispatch(requestArticleByTitle(articleTitle));
  return getArticleByTitle(articleTitle, articleReceived, failedToReceiveArticle);
};

export const createArticle = (title, content, markup) => dispatch => {
  dispatch(creatingArticle());
  return createArticleCall(title, content, markup, articleCreated, failedToCreateArticle);
};

export const updateArticle = (id, isDraft, content, body, markup) => dispatch => {
  dispatch(updatingArticle());
  return updateArticleCall(id, isDraft, content, body, markup, articleUpdated, failedToUpdateArticle);
};
