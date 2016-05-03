import axios from 'axios';

import { API_BASE } from 'common/api/index';
import configureStore from 'common/redux/store';

const store = configureStore();
export const POST_ENDPOINT = `${API_BASE}/posts`;

export const getPostByName = (postName, receivePost, failedToReceivePost) =>
  axios
    .get(`${POST_ENDPOINT}/title/${postName}`)
    .then((response) => store.dispatch(receivePost(response.data)))
    .catch((response) => store.dispatch(failedToReceivePost(response)));
