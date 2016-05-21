import Router from 'koa-router';
import * as controller from './collection.controller';
import { isAuthenticated } from '../../auth';
const collectionRouter = new Router({ prefix: '/api/v1/collections' });

collectionRouter
    .get('/', controller.getAllCollections)
    .post('/', isAuthenticated(), controller.createCollection)
    .get('/:id', controller.getId)
    .put('/:id', isAuthenticated(), controller.update)
    .delete('/:id', isAuthenticated(), controller.destroy);

export default collectionRouter;
