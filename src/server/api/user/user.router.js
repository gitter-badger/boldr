import Router from 'koa-router';
import * as userController from './user.controller';

const userRouter = new Router({ prefix: '/api/v1/users' });

userRouter
  .get('/', userController.getUsers)
  .get('/:id', userController.getUserById);

userRouter
  .get('/user/:username', userController.getUserByUserName);


export default userRouter;
