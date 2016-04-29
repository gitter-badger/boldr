import Router from 'koa-router';
import config, { paths } from '../../../../tools/config';
import { registerUser, loginUser, registerEmailCheck } from './auth.controller';
import { validateToken } from '../../auth/validateToken';

const authRouter = new Router();

authRouter.prefix('/api/v1/auth');

authRouter
  .get('/test', async ctx => {
    ctx.body = 'Auth Router';
  });

authRouter
  .post('/register', registerUser)
  .get('/email-check', registerEmailCheck);

authRouter
  .post('/login', loginUser);

authRouter
  .post('/logout', async ctx => {
    ctx.body = 'Hello Logout';
  });

export default authRouter;
