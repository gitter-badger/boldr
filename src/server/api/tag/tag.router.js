import * as tagCtrl from './tag.controller';

export default (app, router) => {
  router.get('/tags', tagCtrl.getAllTags);
  router.post('/tags', tagCtrl.createTag);
};
