import * as usersController from './user.controller';

export default (app, router) => {
  router.get('/users', usersController.getAllUsers);
  // Load user when API with userId route parameter is hit
  router.param('userId', usersController.load);
};
