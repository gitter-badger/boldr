import React from 'react';
import Route from 'react-router/lib/Route';

import UsersContainer from 'scenes/Users/UsersContainer';
import Profile from 'scenes/Users/Profile/Profile';
export default (
  <Route path="/users" component={ UsersContainer }>
    <Route path=":id" component={ Profile } />
  </Route>
);
