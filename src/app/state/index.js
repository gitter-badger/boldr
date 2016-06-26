import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth/auth';
import user from './user/user.reducer';
import article from './article/article.reducer';
import boldr from './boldr/boldr.reducer';
import setting from './setting/setting.reducer';
import page from './page/page.reducer';
import collection from './collection/collection';
import alert from './alert/alert';
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
  setting,
  upload,
  form: formReducer
});

export default rootReducer;
