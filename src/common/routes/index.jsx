import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'common/layouts/CoreLayout';
import HomeContainer from 'common/scenes/Home';
import DashboardContainer from 'common/scenes/Dashboard';
import PostsContainer from 'common/scenes/Dashboard/Posts/PostsContainer';
import CreatePost from 'common/scenes/Dashboard/Posts/CreatePost';
import PostsList from 'common/scenes/Dashboard/Posts/PostsList';
import AuthContainer from 'common/scenes/Auth';
import Error404 from 'common/components/404';

export default (store) => {
  return (
  <Route path="/" component={ CoreLayout }>
    <IndexRoute component={ HomeContainer } />
    <Route path="home" component={ HomeContainer } />
    <Route path="register" component={ AuthContainer } />
    <Route path="login" component={ AuthContainer } />
      <Route path="dashboard" component={ DashboardContainer }>
        <IndexRoute component={ DashboardContainer} />
        <Route path="posts" component={ PostsContainer }>
          <IndexRoute component={ PostsList} />
          <Route path="create" component={ CreatePost } />
        </Route>
      </Route>
     <Route path="*" component={ Error404 } />
  </Route>
  );
};
