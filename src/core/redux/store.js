import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from 'core/redux/modules';
import devTools from 'core/redux/devTools';

export default (history, initialState) => {
  const routing = routerMiddleware(history);
  const enhancers = compose(
    applyMiddleware(thunk, routing),
    devTools
  );

  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('./modules/index', () => {
      const nextRootReducer = require('./modules/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
