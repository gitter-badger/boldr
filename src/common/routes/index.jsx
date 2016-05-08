import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from '../layouts/CoreLayout';
import HomeContainer from '../scenes/Home';
import DashboardContainer from '../scenes/Dashboard';
import BlogContainer from '../scenes/Blog';
import ArticlesContainer from '../scenes/Dashboard/Articles/ArticlesContainer';
import CreateArticle from '../scenes/Dashboard/Articles/CreateArticle';
import ArticleList from '../scenes/Dashboard/Articles/ArticleList';
import SettingsContainer from '../scenes/Dashboard/Settings/SettingsContainer';
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
        <Route path="posts" component={ ArticlesContainer }>
          <IndexRoute component={ ArticleList} />
          <Route path="create" component={ CreateArticle } />
        </Route>
        <Route path="settings" component={ SettingsContainer } />
      </Route>
     <Route path="*" component={ Error404 } />
  </Route>
  );
};
