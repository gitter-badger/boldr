import * as types from './post.constants';

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
const postsReceived = (json) => ({
  type: types.RECEIVE_POSTS,
  isLoading: false,
  json
});

const postReceived = (json) => ({
  type: types.RECEIVE_POST,
  isLoading: false,
  json
});

const postCreated = (json) => ({
  type: types.POST_CREATED,
  isLoading: false,
  json
});

const postUpdated = (json) => ({
  type: types.POST_UPDATED,
  isLoading: false,
  json
});

const postDeleted = (id) => ({
  type: types.POST_DELETED,
  id
});

// Fail receivers
const failedToReceivePosts = (data) => ({
  type: types.RECEIVE_POSTS_FAILED,
  isLoading: false,
  data
});

const failedToReceivePost = (data) => ({
  type: types.FAILED_TO_RECEIVE_POST,
  isLoading: false,
  data
});

const failedToCreatePost = (data) => ({
  type: types.POST_CREATE_FAILED,
  isLoading: false,
  data
});

const failedToUpdatePost = (data) => ({
  type: types.POST_UPDATE_FAILED,
  isLoading: false,
  data
});

// Public action creators
// export const fetchPosts = (onlyMine) => dispatch => {
//   dispatch(requestPosts());
//   return getAllPosts(onlyMine | false, postsReceived, failedToReceivePosts);
// };

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
