import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth/auth.reducer';
import user from './user/user.reducer';
import post from './post/post.reducer';
import boldr from './boldr/boldr.reducer';

const rootReducer = combineReducers({
  routing,
  boldr,
  user,
  auth,
  post,
  form: formReducer
});

export default rootReducer;
