import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../state';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, routerMiddleware(history)];
  let store;

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f // eslint-disable-line
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../state', () => {
      const nextReducer = require('../state');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
