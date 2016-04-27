import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth/auth.reducer';

const rootReducer = combineReducers({
  auth,
  routing
});

export default rootReducer;
