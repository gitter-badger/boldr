import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import UsersContainer from 'scenes/Users/UsersContainer';
import ProfileContainer from 'scenes/Users/Profile/ProfileContainer';
import Profile from 'scenes/Users/Profile/Profile';
export default (
  <Route path="/users" component={ UsersContainer }>
    <Route path=":id" component={ Profile } />
  </Route>
);
