import Router from 'koa-router';
import pkg from '../../../../package.json'; // eslint-disable-line

const info = {
  name: pkg.name,
  version: pkg.version,
  env: process.env.NODE_ENV
};

const router = new Router();
export default router;

router.prefix('/api/v1/version');

router.get('/', async (ctx) => {
  ctx.body = info;
});
