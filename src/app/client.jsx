import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import useScroll from 'react-router-scroll';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WebFontLoader from 'webfontloader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BoldrTheme from 'app/utils.ssr/theme';

import { checkTokenValidity } from 'state/auth/auth';
import preRenderMiddleware from 'app/config.api/preRenderMiddleware';
import createRoutes from 'app/config.routes';
import configureStore from 'app/utils.redux/configureStore';
const muiTheme = getMuiTheme(BoldrTheme);

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Roboto Condensed:400,300']
  }
});
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

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
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
