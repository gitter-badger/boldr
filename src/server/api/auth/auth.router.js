import Router from 'koa-router';
import { registerUser, checkUser } from './auth.controller';
import { authEmail, isAuthenticated } from '../../auth';
import generateToken from 'server/auth/generateToken';

const authRouter = new Router();

authRouter.prefix('/api/v1/auth');

authRouter
  .post('/register', registerUser)
  .get('/check', isAuthenticated(), checkUser)
  .post('/login', authEmail(), generateToken());

export default authRouter;
