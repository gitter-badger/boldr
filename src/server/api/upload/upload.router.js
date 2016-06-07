/**
 * boldr/server/api/upload/upload.router
 * Router for uploading files via api.
 *
 * @exports {Object} uploadRouter
 */
import Router from 'koa-router';
import { upload } from './upload.controller';
import Models from '../../db/models';
const Upload = Models.Upload;
const User = Models.User;
const Tag = Models.Tag;
const uploadRouter = new Router({
  prefix: '/api/v1/uploads'
});

uploadRouter
  .get('/test', async ctx => {
    ctx.body = 'Hello uploads';
  })
  .post('/', upload.single('image'), async (ctx, next) => {
    const fields = {
      filename: ctx.req.file.fieldname,
      originalname: ctx.req.file.originalname,
      mimetype: ctx.req.file.mimetype,
      key: ctx.req.file.key,
      s3url: ctx.req.file.location,
      size: ctx.req.file.size,
      meta: ctx.req.file.metadata,
      userId: ctx.state.user.id
    };

    const uploadedFile = await Upload.create(fields);
      return ctx.created(uploadedFile);
  });
export default uploadRouter;
