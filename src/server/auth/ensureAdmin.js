async function ensureAdmin(ctx, next) {
  if (!ctx.isAuthenticated() || ctx.req.user.group !== 'admin') {
    return ctx.unauthorized(
      'You do not belong to the "admin" user group'
    );
  }
  await next();
}

export default ensureAdmin;
