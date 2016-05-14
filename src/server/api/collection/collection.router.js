import Router from 'koa-router';
import * as controller from './collection.controller';
import { checkAuth } from '../../auth/validateToken';
const collectionRouter = new Router({ prefix: '/api/v1/collections' });

collectionRouter
    .get('/', controller.getAllCollections)
    .post('/', controller.createCollection)
    .get('/:id', controller.getId)
    .put('/:id', controller.update)
    .delete('/:id', controller.destroy);

export default collectionRouter;
