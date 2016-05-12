import Router from 'koa-router';
import passport from 'koa-passport';
import config, { paths } from '../../../../tools/config';
import { registerUser, loginUser } from './auth.controller';

const authRouter = new Router();

authRouter.prefix('/api/v1/auth');

authRouter
  .post('/register', registerUser)
  .post('/login', loginUser);

export default authRouter;
