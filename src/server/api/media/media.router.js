import * as mediaController from './media.controller';

export default (app, router) => {
  router.get('/medias', mediaController.getAllMedia);
  router.get('/medias/:id', mediaController.showMedia);
};
