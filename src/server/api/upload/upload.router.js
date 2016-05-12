/**
 * boldr/server/api/upload/upload.router
 * Router for uploading files via api.
 *
 * @exports {Object} uploadRouter
 */
import Router from 'koa-router';
import multer from 'koa-multer';
const upload = multer({ dest: 'uploads/' });
const uploadRouter = new Router({
  prefix: '/api/v1/uploads'
});

uploadRouter
  .get('/test', async ctx => {
    ctx.body = 'Hello uploads';
  })
  .post('/', upload.single('avatar'));
export default uploadRouter;
