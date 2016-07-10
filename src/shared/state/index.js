import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from 'state/modules/user';
import message from 'state/modules/message';
import boldr from 'state/modules/boldr';
import article from 'state/modules/article';
const rootReducer = combineReducers({
  user,
  message,
  boldr,
  article,
  routing
});

export default rootReducer;
