import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from 'common/containers/DevTools';

import logger from '../middleware/logger';
import rootReducer from '../modules';

let finalCreateStore;

const configureStoreDev = (initialState = {}) => {
  if (__DEBUG__) {
    finalCreateStore = compose(
      applyMiddleware(logger, thunkMiddleware),
      DevTools.instrument()
    )(createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(logger)
    )(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/index', () => {
      const nextReducer = require('../modules/index').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStoreDev;
