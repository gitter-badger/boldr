import axios from 'axios';

import { API_BASE } from 'common/api/index';
import configureStore from 'common/redux/store';

const store = configureStore();
export const POST_ENDPOINT = `${API_BASE}/posts`;

export const getPostByTitle = (postTitle, receivePost, failedToReceivePost) =>
  axios
    .get(`${POST_ENDPOINT}/title/${postTitle}`)
    .then((response) => store.dispatch(receivePost(response.data)))
    .catch((response) => store.dispatch(failedToReceivePost(response)));

export const changePostPublishSetting = (id, isPublic) =>
  axios.put(`${POST_ENDPOINT}/${id}`, { is_public: isPublic });

export const createPostCall = (title, content, editableBody, postCreated, failedToCreatePost) =>
  axios.post(`${POST_ENDPOINT}`, { title, content, editableBody })
    .then((response) => store.dispatch(postCreated(response.data)))
    .catch((response) => store.dispatch(failedToCreatePost(response)));

export const updatePostCall = (id, title, content, editableBody, isPublic, postCreated,
                               failedToUpdatePost) =>
  axios.put(`${POST_ENDPOINT}/${id}`, { title, content, editableBody, isPublic })
    .then((response) => store.dispatch(postCreated(response.data)))
    .catch((response) => store.dispatch(failedToUpdatePost(response)));
