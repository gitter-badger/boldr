import Router from 'koa-router';
import passport from 'koa-passport';
import config, { paths } from '../../../../tools/config';
import { registerUser, loginUser, registerEmailCheck } from './auth.controller';
import { checkAuth } from '../../auth/validateToken';
import localSetup from '../../auth/local/passport';
import localAuth from '../../auth/local';
import User from '../../db/models/user';

localSetup(User);

const authRouter = new Router();

authRouter.prefix('/api/v1/auth');

authRouter
  .post('/register', registerUser)
  .post('/login', loginUser)
  .get('/check', checkAuth(), async ctx => {
    ctx.body = ctx.state.user;
  });
authRouter
  .post('/logout', async ctx => {
    ctx.body = 'Hello Logout';
  });

export default authRouter;
