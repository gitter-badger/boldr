import * as constants from './upload.actions';

const INITIAL_STATE = {
  loading: false,
  error: false,
  message: '',
  droped: false,
  files: [],
  file: ''
};

export default function upload(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.UPLOAD_FILE:
      return {
        ...state,
        loading: true
      };
    case constants.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        droped: true,
        files: action.files,
        file: action.payload
      };
    case constants.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: 'There was a problem uploading'
      };
    case constants.REQUEST_UPLOADS:
      return {
        ...state,
        loading: true,
        error: false
      };
    case constants.RECEIVE_UPLOADS:
      return {
        ...state,
        loading: false,
        error: false,
        files: action.payload
      };
    case constants.RECEIVE_UPLOADS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: 'There was a problem uploading'
      };
    default:
      return state;
  }
}
