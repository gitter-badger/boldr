import Router from 'koa-router';
import * as userController from './user.controller';
import { checkAuth } from '../../auth/validateToken';


const userRouter = new Router({ prefix: '/api/v1/users' });


userRouter
  .get('/', userController.getAll)
  .get('/:id', userController.getId)
  .put('/:id', userController.update)
  .post('/:id/roles/add', userController.addRoleToUser)
  .delete('/:id', userController.destroy);

export default userRouter;
