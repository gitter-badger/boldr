import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import useScroll from 'react-router-scroll';
import axios from 'axios';
import cookie from 'react-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyanA400, lightBlue500, green700 } from 'material-ui/styles/colors';
import { checkTokenValidity } from 'app/state/user/user.actions';

import preRenderMiddleware from 'app/core/util/preRenderMiddleware';
import createRoutes from 'app/core/routes';
import configureStore from 'app/core/store';

// If localStorage is unavailable, fallback to cookie.
const token = localStorage.getItem('boldr:jwt');

// If its available, always send the token in the header.
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  // eslint-disable-line

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
if (token) {
  store.dispatch(checkTokenValidity());
}
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

const root = (
<Provider store={ store }>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <Router history={ history } onUpdate={ onUpdate } render={ applyRouterMiddleware(useScroll()) }>
        { routes }
      </Router>
    </MuiThemeProvider>
  </Provider>
);

const MOUNT_DOM = document.getElementById('root');

ReactDOM.render(root, MOUNT_DOM);
