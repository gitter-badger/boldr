import _debug from 'debug';
import slug from 'slugg';
import Article from '../../db/models/article';
import User from '../../db/models/user';

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
    console.log(ctx.user)

    const article = new Article({
      title: ctx.request.body.title,
      slug: ctx.request.body.slug,
      markup: ctx.request.body.markup,
      content: ctx.request.body.content,
      featureImage: ctx.request.body.featureImage,
      authorId: ctx.user.id.id,
      isDraft: ctx.request.body.draft
    });

    await article.save();
    return ctx.created(article);
  } catch (err) {
    return ctx.error('Uh oh there was a problem!');
  }
};

export const showArticle = async (ctx, next) => {
  const article = await Article.get(ctx.params.id).run();
  ctx.ok(article);
};
