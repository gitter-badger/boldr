// @flow
import React from 'react';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import ReactDOM from 'react-dom';
import match from 'react-router/lib/match';
import {
  Provider
} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  trigger
} from 'redial';
import render from './render';
import createRoutes from '../../shared/config.routes';
import preRenderMiddleware from '../../shared/utils.redux/preRenderMiddleware';
import configureStore from '../../shared/utils.redux/configureStore';
import BoldrTheme from '../../shared/styles/theme';
import type {
  $Request,
  $Response
} from 'express';
/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function boldrSSR(request: $Request, response: $Response) {
  if (process.env.DISABLE_SSR) {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> 🐌  Handling react route without SSR'); // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to populate the initial react application state.
    const html = render();
    response.status(200).send(html);
    return;
  }
  const store = configureStore();
  const history = createMemoryHistory(request.originalUrl);
  const routes = createRoutes(store);

  match({
    routes,
    history
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      return response.status(500).end('internal server error');
    }
    if (!renderProps) {
      return response.status(404).end('not found');
    }

    const {
      dispatch
    } = store;

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    };

    const {
      components
    } = renderProps;

    trigger('fetch', components, locals).then(() => {
      const initialState = store.getState();
      const muiTheme = getMuiTheme(BoldrTheme, {
        userAgent: request.headers['user-agent']
      });
      const boldrComponent = (
        <Provider store={ store }>
          <MuiThemeProvider muiTheme={ muiTheme }>
            <RouterContext { ...renderProps } />
          </MuiThemeProvider>
        </Provider>
      );
      const html = render({
        rootElement: boldrComponent,
        initialState
      });
      response.status(200).send(html);
    }).catch((err) => {
      response.status(500).json(err);
    });
  });
}

export default boldrSSR;
