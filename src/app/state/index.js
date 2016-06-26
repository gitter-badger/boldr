import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth/auth';
import user from './user/user';
import boldr from './boldr/boldr';
import page from './page/page';
import collection from './collection/collection';
import alert from './alert/alert';
import article from './article/article.reducer';
import upload from 'scenes/Dashboard/Uploader/state/upload.reducer';

const rootReducer = combineReducers({
  routing,
  boldr,
  user,
  auth,
  article,
  page,
  collection,
  alert,
  upload,
  form: formReducer
});

export default rootReducer;
