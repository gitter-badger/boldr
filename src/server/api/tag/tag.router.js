import * as tagController from './tag.controller';

export default (app, router) => {
  router.get('/tags', tagController.getAllTags);
};
