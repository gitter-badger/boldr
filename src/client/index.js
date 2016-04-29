import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyanA400, lightBlue500, green700 } from 'material-ui/styles/colors';

import { fetchComponentDataBeforeRender } from 'common/api/fetchComponentDataBeforeRender';
import createRoutes from 'common/routes';
import configureStore from 'common/redux/store';
import Root from 'common/containers/Root';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);
injectTapEventPlugin();
const blueIsh = '#359AD8';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueIsh,
    primary2Color: green700,
    primary3Color: cyanA400
  }
});
/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }
  const { state: { components, params } } = this;
  fetchComponentDataBeforeRender(store.dispatch, components, params);
}

const root = (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <Router history={history} onUpdate={onUpdate}>
        { routes }
      </Router>
    </MuiThemeProvider>
  </Provider>
);

const MOUNT_DOM = document.getElementById('root');

ReactDOM.render(root, MOUNT_DOM);
