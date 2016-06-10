import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import useScroll from 'react-router-scroll';
import axios from 'axios';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { checkTokenValidity } from 'state/user/user.actions';
import preRenderMiddleware from 'app/config.api/preRenderMiddleware';
import createRoutes from 'app/config.routes';
import configureStore from 'app/utils.redux/configureStore';
import muiTheme from 'app/utils.rendering/theme';

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
