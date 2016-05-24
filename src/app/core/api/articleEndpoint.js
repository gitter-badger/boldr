import axios from 'axios';
const API_BASE = '/api/v1';
import configureStore from 'app/core/store';

const store = configureStore();
export const ARTICLE_ENDPOINT = `${API_BASE}/articles`;

export const getArticleByTitle = (articleTitle, receiveArticle, failedToReceiveArticle) =>
  axios
    .get(`${ARTICLE_ENDPOINT}/title/${articleTitle}`)
    .then(response => store.dispatch(receiveArticle(response.data)))
    .catch(response => store.dispatch(failedToReceiveArticle(response)));

export const changeArticlePublishSetting = (id, isDraft) =>
  axios.put(`${ARTICLE_ENDPOINT}/${id}`, { isDraft });

export const createArticleCall = (values, articleCreated, failedToCreateArticle) =>
  axios.post(`${ARTICLE_ENDPOINT}`, values)
    .then(response => store.dispatch(articleCreated(response.data)))
    .catch(response => store.dispatch(failedToCreateArticle(response)));

export const updateArticleCall = (id, title, content, markup, isDraft, articleCreated,
                               failedToUpdateArticle) =>
  axios.put(`${ARTICLE_ENDPOINT}/${id}`, { title, content, markup, isDraft })
    .then(response => store.dispatch(articleCreated(response.data)))
    .catch(response => store.dispatch(failedToUpdateArticle(response)));
