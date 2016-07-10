import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import DashboardRoutes from './dashboard.routes';
import CoreLayout from 'shared/components/tpl.CoreLayout';

function handleError(err) {
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function resolveAboutComponent(nextState, cb) {
  System.import('scenes/About')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveBlogComponent(nextState, cb) {
  System.import('scenes/Blog')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveErrorComponent(nextState, cb) {
  System.import('components/pg.Error404')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveIndexComponent(nextState, cb) {
  System.import('scenes/Home')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveLoginComponent(nextState, cb) {
  System.import('scenes/Auth/Login')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveProfileComponent(nextState, cb) {
  System.import('scenes/Profile')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveSignupComponent(nextState, cb) {
  System.import('scenes/Auth/Signup')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

export default (store) => {
  return (
      <Route path="/" component={ CoreLayout }>
        <IndexRoute getComponent={ resolveIndexComponent } />
        <Route path="about" getComponent={ resolveAboutComponent } />
        <Route path="blog" getComponent={ resolveBlogComponent } />
        <Route path="login" getComponent={ resolveLoginComponent } />
        <Route path="profile" getComponent={ resolveProfileComponent } />
        <Route path="signup" getComponent={ resolveSignupComponent } />

        { DashboardRoutes }

        <Route path="*" getComponent={ resolveErrorComponent } />
      </Route>
  );
};
