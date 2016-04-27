import Router from 'koa-router';
const router = new Router();

router.prefix('/api/v1/users');
router
  .get('/test', async ctx => {
    ctx.body = 'Hello World';
  });

export default router;
