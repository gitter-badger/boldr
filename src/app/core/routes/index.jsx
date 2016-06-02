import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import DashboardRoutes from './dashboard.routes';
import CoreLayout from 'app/layouts/CoreLayout';
import HomeContainer from 'app/scenes/Home';

import BlogContainer from 'app/scenes/Blog';
import { RegisterContainer, LoginContainer } from 'app/scenes/Auth';
import Error404 from 'app/components/404';

export default (store) => {
  return (
  <Route path="/" component={ CoreLayout }>
    <IndexRoute component={ HomeContainer } />
    <Route path="home" component={ HomeContainer } />
    <Route path="register" component={ RegisterContainer } />
    <Route path="login" component={ LoginContainer } />
    <Route path="blog" component={ BlogContainer } />
       { DashboardRoutes }
     <Route path="*" component={ Error404 } />
  </Route>
  );
};