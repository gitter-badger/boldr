import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import DashboardRoutes from './dashboard.routes';
import CoreLayout from '../layouts/CoreLayout';
import HomeContainer from '../scenes/Home';

import BlogContainer from '../scenes/Blog';

import AuthContainer from '../scenes/Auth';
import LoginContainer from '../scenes/Auth/LoginContainer';
import Error404 from '../components/404';

export default (store) => {
  return (
  <Route path="/" component={ CoreLayout }>
    <IndexRoute component={ HomeContainer } />
    <Route path="home" component={ HomeContainer } />
    <Route path="register" component={ AuthContainer } />
    <Route path="login" component={ LoginContainer } />
    <Route path="blog" component={ BlogContainer } />
       { DashboardRoutes }
     <Route path="*" component={ Error404 } />
  </Route>
  );
};
