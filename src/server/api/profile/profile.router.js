import Router from 'koa-router';
import * as profileController from './profile.controller';
import { checkAuth } from '../../auth/validateToken';

const profileRouter = new Router({ prefix: '/api/v1/profiles' });

profileRouter
  .get('/:id', profileController.getProfile);
//   .get('/:id', profileController.getAccountById);

// profileRouter.get('/me', checkAuth(), profileController.getMe);

export default profileRouter;
