import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'common/layouts/CoreLayout';
import HomeContainer from 'common/containers/Home';
import About from 'common/components/views/About';
import Error404 from 'common/components/404';

export default (store) => {
  return (
  <Route path="/" component={ CoreLayout }>
    <IndexRoute component={ HomeContainer } />
    <Route path="home" component={ HomeContainer } />
    <Route path="about" component={About} />
     <Route path="*" component={ Error404 } />
  </Route>
  );
};
