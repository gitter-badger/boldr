import Router from 'koa-router';
import * as accountController from './account.controller';
import { checkAuth } from '../../auth/validateToken';

const accountRouter = new Router({ prefix: '/api/v1/users' });

accountRouter
  .get('/', accountController.getAccounts)
  .get('/:id', accountController.getAccountById);

accountRouter.get('/me', checkAuth(), accountController.getMe);

export default accountRouter;
