import Router from 'koa-router';
import * as userController from './user.controller';
import { checkAuth } from '../../auth/validateToken';
const userRouter = new Router({ prefix: '/api/v1/users' });

userRouter
  .get('/', userController.getUsers)
  .get('/:id', userController.getUserById);

userRouter.get('/me', checkAuth(), userController.getMe);

export default userRouter;
