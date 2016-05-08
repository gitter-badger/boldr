import Router from 'koa-router';
import passport from 'koa-passport';
import config, { paths } from '../../../../tools/config';
import { registerUser, loginUser, registerEmailCheck } from './auth.controller';
import { validateToken } from '../../auth/validateToken';
import localSetup from '../../auth/local/passport';
import localAuth from '../../auth/local';
import User from '../../db/models/user';
localSetup(User);

const authRouter = new Router();

authRouter.prefix('/api/v1/auth');

authRouter
  .get('/test', async ctx => {
    ctx.body = 'Auth Router';
  });
//localAuth
authRouter
  .post('/register', registerUser)
  .get('/check', validateToken, async ctx => {
    ctx.body = 'You are authorized.';
  });

authRouter
  .post('/login', loginUser);

authRouter
  .post('/logout', async ctx => {
    ctx.body = 'Hello Logout';
  });

export default authRouter;
