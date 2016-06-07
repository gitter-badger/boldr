/**
 * boldr/server/api/upload/upload.router
 * Router for uploading files via api.
 *
 * @exports {Object} uploadRouter
 */
import Router from 'koa-router';
import { upload } from './upload.controller';

const uploadRouter = new Router({
  prefix: '/api/v1/uploads'
});

uploadRouter
  .get('/test', async ctx => {
    ctx.body = 'Hello uploads';
  })
  .post('/', upload.single('image'), (ctx) => {
    console.info(ctx.req)
    return ctx.created(ctx.req);
  });
export default uploadRouter;
