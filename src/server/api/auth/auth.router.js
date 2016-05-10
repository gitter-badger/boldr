import Router from 'koa-router';
import passport from 'koa-passport';
import config, { paths } from '../../../../tools/config';
import { registerAccount, loginUser, registerEmailCheck } from './auth.controller';
import { checkAuth } from '../../auth/validateToken';
import localSetup from '../../auth/local/passport';
import localAuth from '../../auth/local';
import Account from '../../db/models/account';

localSetup(Account);

const authRouter = new Router();

authRouter.prefix('/api/v1/auth');

authRouter
  .post('/register', registerAccount)
  .post('/login', loginUser)
  .get('/check', checkAuth(), async ctx => {
    ctx.body = ctx.state.account;
  });
authRouter
  .post('/logout', async ctx => {
    ctx.body = 'Hello Logout';
  });

export default authRouter;
