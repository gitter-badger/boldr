import * as mediaCtrl from './media.controller';

export default (app, router) => {
  router.get('/medias', mediaCtrl.getAllMedia);
  router.get('/medias/:id', mediaCtrl.showMedia);
  router.get('/medias/aws/bucket', mediaCtrl.getAllAWS);
};
