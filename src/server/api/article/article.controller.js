import _debug from 'debug';
import slug from 'slugg';
import Article from '../../db/models/article';
// import ArticleService from 'server/api/article/article.service';

const debug = _debug('boldr:article:controller');
debug('init');

export async function getAllArticles(ctx) {
  const articles = await Article.getJoin({
    user: true,
    tags: true
  }).run();
  return ctx.ok(articles);
}

/**
 * @description
 * creates a new article
 * @route /api/v1/articles
 * @method POST
 */
export const createArticle = async (ctx, next) => {
  try {
    const aSlug = slug(ctx.request.body.slug);
    const article = ctx.request.body;
    article.slug = aSlug;
    article.authorId = ctx.decoded.id;

    await Article.save(article).then((article) => {
      return ctx.created(article);
    });
  } catch (err) {
    return ctx.error('Uh oh there was a problem!');
  }
};

export const showArticle = async (ctx, next) => {
  const article = await Article.get(ctx.params.id).run();
  ctx.ok(article);
};
