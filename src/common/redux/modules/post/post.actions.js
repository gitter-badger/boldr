import { polyfill } from 'es6-promise';
import axios from 'axios';
import * as types from './post.constants';
polyfill();

const requestPosts = () => ({
  type: types.REQUEST_POSTS
});

const requestPostByTitle = (title) => ({
  type: types.REQUEST_POST_BY_NAME,
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

// export const fetchPostByName = (postName) => dispatch => {
//   dispatch(requestPostByTitle(postName));
//   return getPostByName(postName, postReceived, failedToReceivePost);
// };

// export const createPost = (title, body, editableBody) => dispatch => {
//   dispatch(creatingPost());
//   return createPostCall(title, body, editableBody, postCreated, failedToCreatePost);
// };

// export const updatePost = (id, title, body, editableBody) => dispatch => {
//   dispatch(creatingPost());
//   return updatePostCall(id, title, body, editableBody, postUpdated, failedToUpdatePost);
// };

// export const deletePost = (id) => dispatch => {
//   dispatch(postDeleted(id));
//   return deletePostCall(id, postDeleted, postDeleted);
// };

// export const getOrFetchPost = (title) => dispatch => {
//   const post = store.getState().PostsReducer.posts.filter((x) => x.title === title);
//   if (post.length === 0) {
//     dispatch(fetchPostByName(title));
//   } else {
//     dispatch(postReceived(post[0]));
//   }
// };
