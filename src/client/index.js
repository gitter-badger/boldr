/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import axios from 'axios';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';
import { syncHistoryWithStore } from 'react-router-redux';
import io from 'socket.io-client';
import { trigger } from 'redial';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import WebFontLoader from 'webfontloader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BoldrTheme from 'shared/styles/theme';
import createRoutes from 'shared/config.routes/index';
import configureStore from 'shared/utils.redux/configureStore';
import preRenderMiddleware from 'shared/utils.redux/preRenderMiddleware';
import { checkTokenValidity } from 'shared/state/modules/user';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Roboto Condensed:400,300']
  }
});
const container = document.getElementById('app');
const initialState = window.__INITIAL_STATE__;
const muiTheme = getMuiTheme(BoldrTheme);
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

const token = localStorage.getItem('boldr:jwt') || undefined;
if (token) {
  store.dispatch(checkTokenValidity());
}
// If its available, always send the token in the header.
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  // eslint-disable-line
injectTapEventPlugin();
function onUpdate() {
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  const { components, params } = this.state;
  preRenderMiddleware(store.dispatch, components, params);
}

function initSocket() {
  const socket = io('');
  socket.on('news', data => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', data => {
    console.log(data);
  });

  return socket;
}
global.socket = initSocket();
function renderApp() {
  history.listen(location => {
    match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log('==> 😭  React Router match failed.'); // eslint-disable-line no-console
      }
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch: store.dispatch
      };
      const { components } = renderProps;

      if (window.__INITIAL_STATE__) {
        delete window.__INITIAL_STATE__;
      } else {
        trigger('fetch', components, locals);
      }
      trigger('defer', components, locals);
      render(
      <AppContainer>
        <Provider store={ store }>
          <MuiThemeProvider muiTheme={ muiTheme }>
            <Router history={ history } { ...renderProps } />
          </MuiThemeProvider>
        </Provider>
      </AppContainer>,
      container
    );
    });
  });
}

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept();
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept('../shared/config.routes', renderApp);
}

renderApp();
