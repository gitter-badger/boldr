import * as topicsController from './topics.controller';

export default (app, router) => {
    router.get('/topic', topicsController.all);
    router.post('/topic/:id', topicsController.add);
    router.put('/topic/:id', topicsController.update);
    router.delete('/topic/:id', topicsController.remove);
};
