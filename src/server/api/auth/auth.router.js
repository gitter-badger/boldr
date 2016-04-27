import Router from 'koa-router';
import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import User from '../../db/models/user';
import config, { paths } from '../../../../tools/config';
import { returnCode, response } from '../../utils';
import { registerUser, loginUser } from './auth.controller';

const router = new Router();
const salt = genSaltSync();

router.prefix('/api/v1/auth');

router
  .get('/test', async ctx => {
    ctx.body = 'Auth Router';
  });

router
  .post('/register', registerUser);

router
  .post('/login', loginUser);

router
  .post('/logout', async ctx => {
    ctx.body = 'Hello Logout';
  });

export default router;
