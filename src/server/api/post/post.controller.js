import _debug from 'debug';
import Post from '../../db/models/post';

import User from '../../db/models/user';
import { returnCode, response, respond } from '../../utils';
const debug = _debug('boldr:post:controller');
debug('init');

export async function getAllPosts(ctx) {
  const posts = await Post.fetchAll({});
  return ctx.ok(posts);
}

/**
 * @description
 * registers a new user
 * @route /api/v1/auth/register
 * @method POST
 */
export const createPost = async (ctx, next) => {
  try {
    const user = await User.where({
      id: ctx.decoded.id.id
    }).fetch(['id']);

    await Post.forge({
      title: ctx.request.body.title,
      slug: ctx.request.body.slug,
      markup: ctx.request.body.markup,
      content: ctx.request.body.content,
      image: ctx.request.body.image,
      author_id: user.id,
      is_public: ctx.request.body.is_public
    }).save();
    ctx.status = 201;
  } catch (err) {
    response.send(err);
  }
};

/**
 * Performs a lookup of posts by the authors username.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the Post object.
 */
export async function getPostsByAuthor(ctx, next) {
  try {
    const user = await User.where('username', ctx.params.username).fetch({
      columns: ['display_name', 'username', 'id', 'avatar', 'email']
    });

    await Post.query('where', 'author_id', user.id).fetchAll()
      .then((posts) => {
        if (posts) {
          return ctx.ok(posts);
        }
      });
  } catch (err) {
    return ctx.error(`There was a problem ${err}`);
  }
}

/**
 * Performs a lookup of posts by the authors username.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the Post object.
 */
export const getPostByTitle = async (ctx) => {
  const post = await Post.query('where', 'title', 'Homerun').fetch();
  return ctx.ok(post);
};
// export async function getUserById(models, userId) {
//   return await models.User.findById(userId);
// }
// .get('/:id', async ctx => await accountController.getUserById(models, ctx.params.id))
