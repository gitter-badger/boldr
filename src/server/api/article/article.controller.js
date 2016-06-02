import _debug from 'debug';
import slug from 'slugg';
import Models from '../../db/models';
const Article = Models.Article;
const User = Models.User;
const Tag = Models.Tag;
const debug = _debug('boldr:article:controller');
debug('init');
const MAX_TAGS = 15;
/**
 * Gets all articles
 * @method getAllArticles
 * @param  {request} ctx
 * @return {Array}     array containing all article objects.
 */
export const getAllArticles = async (ctx) => {
  const articles =
  await Article.findAll({
    include: [{
      model: User,
      attributes: ['id', 'firstName', 'lastName', 'email']
    }, {
      model: Tag,
      attributes: ['tagname']
    }]
  });
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
 * @param {ENUM} status        whether or not the article is published
 * @param {Date}    createdAt      the time the article was saved.
 * @return {Object}                the article object
 */
export const createArticle = async (ctx, next) => {
  const body = {
    title: ctx.request.body.title,
    slug: slug(ctx.request.body.slug),
    markup: ctx.request.body.markup,
    content: ctx.request.body.content,
    featureImage: ctx.request.body.featureImage,
    authorId: ctx.state.user.id,
    status: ctx.request.body.status,
    tags: ctx.request.body.tags
  };
  // Split the ctx.request.body.tags at each , as a tag
  if (ctx.request.body.tags) {
    ctx.request.body.tags = ctx.request.body.tags.split(',', MAX_TAGS).map(tag => tag.substr(0, 15));
  }

  const articleFields = {
    title: ctx.request.body.title,
    slug: slug(ctx.request.body.slug),
    markup: ctx.request.body.markup,
    content: ctx.request.body.content,
    featureImage: ctx.request.body.featureImage,
    authorId: ctx.state.user.id,
    status: ctx.request.body.status
  };

  try {
    // Creates an article with all fields except for tags
    const article = await Article.create(articleFields);
    // creates a new "Tag" for every tag in the ctx.request.body.tags
    for (let i = 0; i < ctx.request.body.tags.length; i++) {
      const newTag = await Tag.create({ tagname: ctx.request.body.tags[i] });
      // Adds articleId of the previously created Article and
      // adds the tagId of each created Tag to the ArticlesTags table.
      await article.addTag(newTag);
    }
    // Performs a quick get to save an api req.
    if (ctx.request.body.tags) {
      article.Tags = ctx.request.body.tags.map(tag => ({ tagname: tag }));
    }
    // Send the article and 201.
    return ctx.created(article);
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
  const article = await Article.findById(ctx.params.id, {
    include: [{
      model: User,
      attributes: ['id', 'firstName', 'lastName', 'email']
    }, {
      model: Tag,
      attributes: ['tagname']
    }]
  });
  return ctx.ok(article);
};

/**
 * looks up an article by the slug, which is a sanitized version of its title.
 * @method getArticleBySlug
 * @param  {String}   ctx  the slug param.
 * @return {Object}        The article
 */
export const getArticleBySlug = async (ctx, next) => {
  const article = await Article.findOne({ where: { slug: ctx.params.slug },
    include: [{
      model: User,
      attributes: ['id', 'firstName', 'lastName', 'email']
    }, {
      model: Tag,
      attributes: ['tagname']
    }] });

  return ctx.ok(article);
};

/**
 * looks up all articles by the userId (authorId)
 * @method getArticleByAuthor
 * @param  {String}   ctx  the userId param
 * @return {Array}        Articles
 */
export const getArticleByAuthor = async (ctx, next) => {
  const articles = await Article.findAll({ where: { authorId: ctx.params.userId },
    include: [{
      model: User,
      attributes: ['id', 'firstName', 'lastName', 'email']
    }, {
      model: Tag,
      attributes: ['tagname']
    }]
  });
  return ctx.ok(articles);
};

/**
 * Updates an article
 * @method update
 * @param  {String} ctx the articleId param
 * @return {Object}     Updated article.
 */
export const update = async (ctx) => {
  const result = await Article.update(ctx.request.body, { where: { id: ctx.params.id } });
  return ctx.ok(result);
};

/**
 * Remove an article from the database.
 * @method destroy
 * @param  {String} ctx the articleId passed as a param
 * @return {Number}     should return 204.
 *        if(!req.user.isAdmin()){
            delete req.body.enabled;
        }
 */
export const destroy = async (ctx) => {
  const found = await Article.findById(ctx.params.id);
  found.destroy();
  ctx.status = 204;
};
