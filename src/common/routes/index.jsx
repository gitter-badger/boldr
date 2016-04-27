import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'common/layouts/CoreLayout';
import HomeContainer from 'common/containers/Home';
import About from 'common/components/views/About';
import Hello from 'common/components/views/Hello';

export default (
  <Route path="/" component={ CoreLayout }>
    <IndexRoute component={ HomeContainer } />
    <Route path="home" component={ HomeContainer } />
    <Route path="hello" component={Hello} />
    <Route path="about" component={About} />
    <Redirect from="*" to="hello" />
  </Route>
);
