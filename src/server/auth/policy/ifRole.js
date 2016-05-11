/**
 * boldr/server/auth/policy/ifRole
 * Middleware to verify rights.
 *
 * @exports {Function} - Koa-Router Middleware
 */

import Account from 'server/db/models/account';
import config from 'config';
import logger from 'server/utils/logger';

/**
 * Checks user rights
 *
 * @param {Object} account - the account model.
 * @param {String|Number} role - role to check against
 * @returns {Boolean} - Is the user equal to or greater than the requested role?
 */
export default (account, role, ctx) => {
  const possibilities = Account.indexOf;
  const accountRole = possibilities.indexOf(account.right);

  if (typeof role === 'string') {
    role = possibilities.indexOf(role.toUpperCase());
  }

  if (role > possibilities.length || role < 0) {
    return ctx.error(`Invalid isRole policy of ${role}`);
  }

  if (!config.rights) {
    logger.info(`User rights disabled, letting ${account.username} access "${possibilities[role]}" section`);
    return true;
  }

  if (accountRole >= role) {
    logger.info(
      `${account.username} is a "${possibilities[accountRole]}", allowing access to "${possibilities[role]}" section`);
    return true;
  }

  logger.info(
    `${account.username} is a "${possibilities[accountRole]}", denying access to "${possibilities[role]}" section`);
  return false;
};
