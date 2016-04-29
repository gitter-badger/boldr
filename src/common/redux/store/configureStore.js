import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import logger from '../middleware/logger';
import rootReducer from '../modules';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  const middleware = [thunkMiddleware, promiseMiddleware, routerMiddleware(history)];
  if (__DEV__) {
    middleware.push(createLogger());
  }

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/index', () => {
      const nextReducer = require('../modules/index').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
