import Router from 'koa-router';
import error from '../../middleware/error';
import pkg from '../../../../package.json'; // eslint-disable-line

const info = {
  name: pkg.name,
  version: pkg.version,
  env: process.env.NODE_ENV
};

const router = new Router();
export default router;

router.prefix('/api/v1/version');
router.use(error());

router.get('/', async (ctx) => {
  ctx.body = info;
});
