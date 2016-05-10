import Router from 'koa-router';
import * as accountController from './account.controller';
import { validateToken } from '../../auth/validateToken';

const accountRouter = new Router({ prefix: '/api/v1/accounts' });

accountRouter
  .get('/', accountController.getAccounts)
  .get('/:id', accountController.getAccountById);

accountRouter.get('/me', validateToken(), accountController.getMe);

export default accountRouter;
