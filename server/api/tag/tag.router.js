import * as tagCtrl from './tag.controller';

export default (app, router) => {
  router.get('/tags', tagCtrl.getAllTags);
  router.post('/tags', tagCtrl.createTag);
  router.get('/tags/:id', tagCtrl.showTag);
  router.put('/tags/:id', tagCtrl.updateTag);
  router.delete('/tags/:id', tagCtrl.destroyTag);
};
