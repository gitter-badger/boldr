import passport from 'koa-passport';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import error from 'koa-json-error';
import responseCalls from './responseCalls';
import bodyParser from './bodyParser';
import session from './session';
import jwt from './jwt';

/**
 * Boldr middleware bootstraps the majority of middleware for the app.
 * @param  {Object} app
 */
export default (app) => {
  app
    .use(responseCalls)
    .use(error())
    .use(bodyParser)
    .use(etag())
    .use(jwt)
    .use(session)
    .use(helmet());
  app.use(passport.initialize());
  app.use(passport.session());
};
