import { polyfill } from 'es6-promise';
import axios from 'axios';
import { push } from 'react-router-redux';
import { API_BASE } from 'app/config.api';

polyfill();

export const UPLOAD_FILE = '@@upload/UPLOAD_FILE';
export const UPLOAD_FILE_SUCCESS = '@@upload/UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = '@@upload/UPLOAD_FILE_FAILURE';

export const UPLOADS_ENDPOINT = `${API_BASE}/uploads`;

const uploadStart = () => ({
  type: UPLOAD_FILE
});
export const dropFileAccepted = (files) => {
  return {
    type: UPLOAD_FILE_SUCCESS,
    files: files
  }
}

export const dropFileRejected = () => {
  return {
    type: UPLOAD_FILE_FAILURE
  }
}
const uploadSuccess = (response) => ({
  type: UPLOAD_FILE_SUCCESS,
  loading: false,
  payload: response.data
});

// Fail receivers
const failedToUpload = (data) => ({
  type: UPLOAD_FILE_FAILURE,
  loading: false,
  data
});

// Public action creators
export function uploadFile(data) {
  return dispatch => {
    dispatch(uploadStart());
    return axios.post(`${UPLOADS_ENDPOINT}`, {
      responseType: 'multipart/form-data'
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(uploadSuccess(response));
        } else {
          dispatch(failedToUpload('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(failedToUpload(err));
      });
  };
}
