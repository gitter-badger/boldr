import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import DashboardRoutes from './dashboard.routes';
import UsersRoutes from './users.routes';
import CoreLayout from 'shared/tpl.CoreLayout';
import Home from 'scenes/Home';
import Alert from 'shared/atm.Alert';
import BlogContainer from 'scenes/Blog';
import { RegisterContainer, LoginContainer } from 'scenes/Auth';
import Error404 from 'shared/pg.Error404';

export default (store) => {
  return (
  <Route path="/" component={ CoreLayout }>
    <IndexRoute component={ Alert(Home) } />
    <Route path="home" component={ Home } />
    <Route path="register" component={ RegisterContainer } />
    <Route path="login" component={ LoginContainer } />

    <Route path="blog" component={ BlogContainer } />
       { DashboardRoutes }
       { UsersRoutes }
     <Route path="*" component={ Error404 } />
  </Route>
  );
};
