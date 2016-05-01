import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from '../layouts/CoreLayout';
import HomeContainer from '../scenes/Home';
import DashboardContainer from '../scenes/Dashboard';
import BlogContainer from '../scenes/Blog';
import PostsContainer from '../scenes/Dashboard/Posts/PostsContainer';
import CreatePost from '../scenes/Dashboard/Posts/CreatePost';
import PostsList from '../scenes/Dashboard/Posts/PostsList';
import AuthContainer from '../scenes/Auth';
import Error404 from '../components/404';

export default (store) => {
  return (
  <Route path="/" component={ CoreLayout }>
    <IndexRoute component={ HomeContainer } />
    <Route path="home" component={ HomeContainer } />
    <Route path="register" component={ AuthContainer } />
    <Route path="login" component={ AuthContainer } />
    <Route path="blog" component={ BlogContainer } />
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
