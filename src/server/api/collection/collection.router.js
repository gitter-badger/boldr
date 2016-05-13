import Router from 'koa-router';
import * as controller from './collection.controller';
import { checkAuth } from '../../auth/validateToken';
const collectionRouter = new Router({ prefix: '/api/v1/collections' });

collectionRouter
    .get('/', controller.getAllCollections)

export default collectionRouter;
