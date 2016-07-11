import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user, { INITIAL_USER_STATE } from 'state/modules/user';
import message from 'state/modules/message';
import boldr from 'state/modules/boldr';
import article from 'state/modules/article';
import siteUsers from 'scenes/Dashboard/Users/siteUsers.reducer';

const rootReducer = combineReducers({
  user,
  message,
  boldr,
  article,
  siteUsers,
  routing,
  form: formReducer
});

export default rootReducer;
