import Router from 'koa-router';
import * as controller from './page.controller';

const pageRouter = new Router({ prefix: '/api/v1/pages' });

pageRouter
    .get('/', controller.getAllPages)
    .post('/', controller.createPage)
    .get('/:id', controller.getId)
    .put('/:id', controller.update)
    .delete('/:id', controller.destroy);

export default pageRouter;
