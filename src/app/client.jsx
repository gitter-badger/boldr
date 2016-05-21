import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactRethinkdb from 'react-rethinkdb';
import useScroll from 'react-router-scroll';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyanA400, lightBlue500, green700 } from 'material-ui/styles/colors';

import preRenderMiddleware from 'app/state/middleware/preRenderMiddleware';
import createRoutes from 'app/routes';
import configureStore from 'app/state/store';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);
injectTapEventPlugin();
const blueIsh = '#272734';
const pinkish = '#DD144D';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueIsh,
    accent1Color: pinkish,
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
  preRenderMiddleware(store.dispatch, components, params);
}

// TODO: extract out config vars.
ReactRethinkdb.DefaultSession.connect({
  host: 'localhost', // hostname of the websocket server
  port: 3000, // port number of the websocket server
  path: '/db', // HTTP path to websocket route
  secure: false, // set true to use secure TLS websockets
  db: 'boldr_dev' // default database, passed to rethinkdb.connect
});

const root = (
<Provider store={store}>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <Router history={history} onUpdate={onUpdate} render={ applyRouterMiddleware(useScroll()) }>
        { routes }
      </Router>
    </MuiThemeProvider>
  </Provider>
);

const MOUNT_DOM = document.getElementById('root');

ReactDOM.render(root, MOUNT_DOM);
