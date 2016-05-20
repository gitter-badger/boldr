import Router from 'koa-router';
import passport from 'koa-passport';
import config, { paths } from '../../../../tools/config';
import { registerUser, loginUser, checkUser } from './auth.controller';
// import { checkAuth } from '../../auth/validateToken';
import {
  authEmail,
  generateToken,
  isAuthenticated
} from '../../auth';
const authRouter = new Router();

authRouter.prefix('/api/v1/auth');

authRouter
  .post('/register', registerUser)
  .get('/check', isAuthenticated(), checkUser)
  .post('/login', authEmail(), generateToken());

export default authRouter;
