import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LayoutContainer from 'core/containers/Layout';
import HomeContainer from 'core/containers/Home';

export default (
  <Route path="/" component={ LayoutContainer }>
    <IndexRoute component={ HomeContainer } />
  </Route>
);
