import chalk from 'chalk';
import json from 'prettyjson';
import _debug from 'debug';

const debug = _debug('boldr:log');
export default async (ctx, next) => {
  // If there is a query, pretty print and log to console.
  if (Object.keys(ctx.query).length && ctx.env.dev) {
    debug(`${chalk.magenta('query')} =>\n ${json.render(ctx.query)}`);
  }

  return await next();
};
