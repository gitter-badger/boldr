import _debug from 'debug';
import * as constants from './article.constants';

const debug = _debug('article.reducer:debug');

export const INITIAL_STATE = {
  loading: true,
  message: '',
  error: false,
  filter: {},
  editArticleId: -1,
  authors: [],
  categories: [],
  articles: [],
  article: {}
};

export default function article(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.REQUEST_ARTICLES:
      return {
        ...state,
        loading: true
      };
    case constants.RECEIVE_ARTICLES:
      return {
        ...state,
        loading: false,
        articles: action.payload
      };
    case constants.RECEIVE_ARTICLES_FAILED:
      return {
        ...state,
        loading: false
      };
    case constants.REQUEST_ARTICLE_BY_TITLE:
      return {
        ...state,
        loading: true
      };
    case constants.RECEIVE_ARTICLE:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, action.payload]
      };
    case constants.FAILED_TO_RECEIVE_ARTICLE:
      return {
        ...state,
        loading: false
      };
    case constants.ARTICLE_DELETED:
      return {
        ...state,
        loading: false,
        articles: [...state.articles].filter((article) => article.id !== parseInt(action.id, 10))
      };
    case constants.ARTICLE_CREATED:
      return {
        ...state,
        loading: false,
        editArticleId: action.payload.id
      };
    default:
      return state;
  }
}
