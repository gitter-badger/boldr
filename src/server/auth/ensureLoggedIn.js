// a more simpler version that is adapted from
// `koa-ensure-login` to use async/await
// (this is adapted from the original `connect-ensure-login`)
// <https://github.com/RobinQu/koa-ensure-login>
// <https://github.com/jaredhanson/connect-ensure-login>

async function ensureLoggedIn(ctx, next) {
  if (!ctx.isAuthenticated()) {
    ctx.session.returnTo = ctx.originalUrl || ctx.req.url;
    ctx.redirect('/login');
    return;
  }

  await next();
}
export default ensureLoggedIn;
