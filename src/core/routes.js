import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LayoutContainer from './containers/Layout';
import HomeContainer from './containers/Home';

export default (
  <Route path="/" component={ LayoutContainer }>
    <IndexRoute component={ HomeContainer } />
  </Route>
);
