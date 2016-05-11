/**
 * boldr/server/auth/policy/ifRole
 * Middleware to verify rights.
 *
 * @exports {Function} - Koa-Router Middleware
 */

import User from 'server/db/models/user';
import config from 'config';
import logger from 'server/utils/logger';

/**
 * Checks user rights
 *
 * @param {Object} user - the user model.
 * @param {String|Number} role - role to check against
 * @returns {Boolean} - Is the user equal to or greater than the requested role?
 */
export default (user, role, ctx) => {
  const possibilities = User.indexOf;
  const userRole = possibilities.indexOf(user.right);

  if (typeof role === 'string') {
    role = possibilities.indexOf(role.toUpperCase());
  }

  if (role > possibilities.length || role < 0) {
    return ctx.error(`Invalid isRole policy of ${role}`);
  }

  if (!config.rights) {
    logger.info(`User rights disabled, letting ${user.username} access "${possibilities[role]}" section`);
    return true;
  }

  if (userRole >= role) {
    logger.info(
      `${user.username} is a "${possibilities[userRole]}", allowing access to "${possibilities[role]}" section`);
    return true;
  }

  logger.info(
    `${user.username} is a "${possibilities[userRole]}", denying access to "${possibilities[role]}" section`);
  return false;
};
