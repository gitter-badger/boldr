import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth/auth.reducer';
import boldr from './boldr/boldr.reducer';

const rootReducer = combineReducers({
  routing,
  boldr,
  auth
});

export default rootReducer;
