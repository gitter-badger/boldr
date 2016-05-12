import _debug from 'debug';
import slug from 'slugg';
import Article from '../../db/models/article';
const debug = _debug('boldr:article:controller');
debug('init');

export async function getAllArticles(ctx) {
  const articles = await Article.getJoin({
    user: true
  }).run().then((articles) => {
    return ctx.ok(articles);
  });
}

/**
 * @description
 * creates a new article
 * @route /api/v1/articles
 * @method POST
 */
export const createArticle = async (ctx, next) => {
  try {
    // const tags = ctx.request.body.tags.id;
    const article = new Article({
      title: ctx.request.body.title,
      slug: slug(ctx.request.body.slug),
      markup: ctx.request.body.markup,
      content: ctx.request.body.content,
      featureImage: ctx.request.body.featureImage,
      userId: ctx.session.user.id,
      isDraft: ctx.request.body.draft
    });
    // article.tags = tags;
    await article.save();
    return ctx.created(article);
  } catch (err) {
    return ctx.error('Something went terribly wrong creating your article. Try again.');
  }
};

export const showArticle = async (ctx) => {
  const article = await Article.get(ctx.params.id).run();
  return ctx.ok(article);
};

/**
 * looks up an article by the slug, which is a sanitized version of its title.
 * @param  {Object}   ctx  slug
 * @return {Object}        The article
 */
export const getArticleBySlug = async (ctx, next) => {
  const article = await Article.filter({
    slug: ctx.params.slug
  }).run();
  return ctx.ok(article);
};
