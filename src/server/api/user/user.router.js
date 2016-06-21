import Router from 'koa-router';
import * as userController from './user.controller';

const userRouter = new Router({ prefix: '/api/v1/users' });

userRouter
  .get('/', userController.getAll)
  .get('/:id', userController.getId)
  .put('/:id', userController.update)
  .delete('/:id', userController.destroy)
  .get('/permissions/:id', userController.checkPermission);

export default userRouter;
