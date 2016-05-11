/**
 * boldr/server/auth/policy/isRole
 * Middleware to check a user's access
 *
 * @exports {Function} - Koa-Router Middleware
 */

import ifRole from './ifRole';
import Account from 'server/db/models/account';

/**
 * Checks a user's rights
 *
 * @param {String|Number} role - Role to check against
 * @returns {Function} - Koa-Router Middleware
 */
export default (role) => {
  return (ctx, next) => {
    if (!ctx.isAuthenticated()) {
      ctx.session.originalUrl = ctx.request.url;
      return ctx.redirect('/login');
    }

    if (ifRole(ctx.account, role)) {
      return next();
    }
    const possibilities = Account.tree.right.enum;

    if (role === possibilities.indexOf('ROLES')) {
      return ctx.forbidden();
    }

    return ctx.forbidden();
  };
};
