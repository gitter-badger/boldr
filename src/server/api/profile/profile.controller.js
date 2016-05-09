import _debug from 'debug';

import Profile from '../../db/models/profile';
import config, { paths } from 'config';

const debug = _debug('boldr:profile:controller');
debug('init');

/**
 * Performs a lookup of a user by their id.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the User object.
 */
export async function getProfile(ctx, next) {
  try {
    const profile = await Profile
      .filter({ accountId: ctx.params.id })

      .getJoin({ account: true })
      .run();

    if (!profile) {
      return ctx.badRequest('Account is Not Found');
    }

    return ctx.ok(profile);
  } catch (err) {
    return ctx.badRequest('Account is Not Found');
  }
}
