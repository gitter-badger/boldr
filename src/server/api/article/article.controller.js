import _debug from 'debug';
import slug from 'slugg';
import r from 'server/db';
import shortid from 'shortid';
const debug = _debug('boldr:article:controller');
debug('init');

/**
 * Gets all articles
 * @method getAllArticles
 * @param  {request} ctx
 * @return {Array}     array containing all article objects.
 */
export const getAllArticles = async (ctx) => {
  const articles =
  await r.table('articles')
  .eqJoin('authorId', r.table('users'))// returns left and right joins
  .zip()// zip combines the two tables into one on request.
  .without('password', 'userId', 'email')
  .run();
  return ctx.ok(articles);
};

/**
 * Creates a new article and saves it to the database.
 * @method createArticle
 * @param {String}  title          the title of the article
 * @param {String}  slug           the title normalized without spaces.
 * @param {String}  markup         any HTML from the post body
 * @param {String}  content        the article body
 * @param {String}  featureImage   an image to go along with the article
 * @param {Number}  authorId       the userId associated with the creator of the article
 * @param {Boolean} isDraft        whether or not the article is published
 * @param {Date}    createdAt      the time the article was saved.
 * @return {Object}                the article object
 */
export const createArticle = async (ctx, next) => {
  const article = {
    articleId: shortid.generate(),
    title: ctx.request.body.title,
    slug: slug(ctx.request.body.slug),
    markup: ctx.request.body.markup,
    content: ctx.request.body.content,
    featureImage: ctx.request.body.featureImage,
    authorId: ctx.state.user.userId,
    isDraft: ctx.request.body.isDraft,
    createdAt: r.now(),
    tagId: ctx.request.body.tagId
  };
  let query = null;

  try {
    query = r.table('articles').insert(article);
    const result = await query.run();
    return ctx.created(result);
  } catch (err) {
    return ctx.error(`Something went terribly wrong creating your article. Try again. ${err}`);
  }
};

/**
 * Show a specific article
 * @method showArticle
 * @param  {String} ctx the articleId passed as a param
 * @return {Object}     the article.
 */
export const showArticle = async (ctx) => {
  const article = await r.table('articles').get(ctx.params.id).run();
  return ctx.ok(article);
};

/**
 * looks up an article by the slug, which is a sanitized version of its title.
 * @method getArticleBySlug
 * @param  {String}   ctx  the slug param.
 * @return {Object}        The article
 */
export const getArticleBySlug = async (ctx, next) => {
  const article = await r.table('articles')
  .filter({ slug: ctx.params.slug })
  .eqJoin('authorId', r.table('users'))// returns left and right joins
  .zip()// zip combines the two tables into one on request.
  .without('password')
  .run();
  return ctx.ok(article);
};

/**
 * looks up all articles by the userId (authorId)
 * @method getArticleByAuthor
 * @param  {String}   ctx  the userId param
 * @return {Array}        Articles
 */
export const getArticleByAuthor = async (ctx, next) => {
  const articles = await r.table('articles')
  .getAll(ctx.params.userId, { index: 'authorId' })
  .run();
  return ctx.ok(articles);
};

/**
 * Updates an article
 * @method update
 * @param  {String} ctx the articleId param
 * @return {Object}     Updated article.
 */
export const update = async (ctx) => {
  const result = await r.table('articles')
    .get(ctx.params.id)
    .update(ctx.request.body)
    .run();
  return ctx.ok(result);
};

/**
 * Remove an article from the database.
 * @method destroy
 * @param  {String} ctx the articleId passed as a param
 * @return {Number}     should return 204.
 */
export const destroy = async (ctx) => {
  const result = await r.table('articles')
    .get(ctx.params.id)
    .delete()
    .run();
  ctx.status = 204;
};
