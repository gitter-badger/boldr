import axios from 'axios';
import * as types from './post.constants';
import { getPostByTitle, createPostCall, updatePostCall } from 'common/api/postEndpoint';
import configureStore from 'common/redux/store';

const store = configureStore();

const requestPosts = () => ({
  type: types.REQUEST_POSTS
});

const requestPostByTitle = (title) => ({
  type: types.REQUEST_POST_BY_TITLE,
  title
});

const creatingPost = () => ({
  type: types.CREATE_POST
});

const updatingPost = () => ({
  type: types.UPDATE_POST
});

// Success receivers
const postsReceived = (response) => ({
  type: types.RECEIVE_POSTS,
  loading: false,
  payload: response.data
});

const postReceived = (response) => ({
  type: types.RECEIVE_POST,
  loading: false,
  payload: response.data
});

const postCreated = (response) => ({
  type: types.POST_CREATED,
  loading: false,
  payload: response.data
});

const postUpdated = (response) => ({
  type: types.POST_UPDATED,
  loading: false,
  payload: response.data
});

const postDeleted = (id) => ({
  type: types.POST_DELETED,
  id
});

// Fail receivers
const failedToReceivePosts = (data) => ({
  type: types.RECEIVE_POSTS_FAILED,
  loading: false,
  data
});

const failedToReceivePost = (data) => ({
  type: types.FAILED_TO_RECEIVE_POST,
  loading: false,
  data
});

const failedToCreatePost = (data) => ({
  type: types.POST_CREATE_FAILED,
  loading: false,
  data
});

const failedToUpdatePost = (data) => ({
  type: types.POST_UPDATE_FAILED,
  loading: false,
  data
});

// Public action creators
export function fetchPosts(data) {
  return dispatch => {
    dispatch(requestPosts());
    return axios.get('http://localhost:3000/api/v1/posts', {
      timeout: 5000,
      responseType: 'json'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(postsReceived(response));
        } else {
          dispatch(failedToReceivePosts('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToReceivePosts(err));
      });
  };
}

export const getOrFetchPost = (title) => dispatch => {
  const post = store.getState().post.posts.filter((x) => x.title === title);
  if (post.length === 0) {
    dispatch(fetchPostByTitle(title));
  } else {
    dispatch(postReceived(post[0]));
  }
};

export const fetchPostByTitle = (postTitle) => dispatch => {
  dispatch(requestPostByTitle(postTitle));
  return getPostByTitle(postTitle, postReceived, failedToReceivePost);
};

export const createPost = (title, content, editableBody) => dispatch => {
  dispatch(creatingPost());
  return createPostCall(title, content, editableBody, postCreated, failedToCreatePost);
};

export const updatePost = (id, isPublic, content, body, editableBody) => dispatch => {
  dispatch(updatingPost());
  return updatePostCall(id, isPublic, content, body, editableBody, postUpdated, failedToUpdatePost);
};
