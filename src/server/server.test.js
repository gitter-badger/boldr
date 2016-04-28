import Koa from 'koa';
import Boldr from './boldr';
import _debug from 'debug';
import projectConfig from '../../tools/config';

const debug = _debug('app:server:test');
const app = new Koa();

Boldr.init(app);

app.listen(projectConfig.SERVER_PORT, () => {
  debug(`Boldr server listening on ${projectConfig.SERVER_PORT} in ${app.env} node`);
});

export default app;
