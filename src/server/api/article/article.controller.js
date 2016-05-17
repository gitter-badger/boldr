import _debug from 'debug';
import slug from 'slugg';
import r from 'server/db';
const debug = _debug('boldr:article:controller');
debug('init');

export async function getAllArticles(ctx) {
  const articles =
  await r.table('articles')
  .eqJoin('authorId', r.table('users'))// returns left and right joins
  .without('password')
  .zip()// zip combines the two tables into one on request.
  .run();
  return ctx.ok(articles);
}

/**
 * @description
 * creates a new article
 * @route /api/v1/articles
 * @method POST
 */
export const createArticle = async (ctx, next) => {
  const article = {
    title: ctx.request.body.title,
    slug: slug(ctx.request.body.slug),
    markup: ctx.request.body.markup,
    content: ctx.request.body.content,
    featureImage: ctx.request.body.featureImage,
    authorId: ctx.state.user.id,
    isDraft: ctx.request.body.isDraft,
    createdAt: new Date()
  };
/*
r.table('articles_tags').eq_join('article_id', r.table('articles')).zip()
.eq_join('tag_id', r.table('tags')).zip().run();
 */
  try {
    await r.table('articles').insert(article).run();
    return ctx.created(article);
  } catch (err) {
    return ctx.error('Something went terribly wrong creating your article. Try again.');
  }
};

export const showArticle = async (ctx) => {
  const article = await r.table('articles').get(ctx.params.id).run();
  return ctx.ok(article);
};

/**
 * looks up an article by the slug, which is a sanitized version of its title.
 * @param  {Object}   ctx  slug
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
// Get all articles with the tag "foo" (where the field tags contains "foo")
// r.table("articles").getAll("foo", {index: "tags"}).run(conn, callback)
export async function update(ctx) {
  const result = await r.table('articles')
    .get(ctx.params.id)
    .update(ctx.request.body)
    .run();
  return ctx.ok(result);
}

export async function destroy(ctx) {
  const result = await r.table('articles')
    .get(ctx.params.id)
    .delete()
    .run();

  return ctx.ok();
}
