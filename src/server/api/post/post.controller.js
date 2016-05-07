import _debug from 'debug';
import Post from '../../db/models/post';
import PostService from 'server/api/post/post.service';
import User from '../../db/models/user';

const debug = _debug('boldr:post:controller');
debug('init');

export async function getAllPosts(ctx) {
  const posts = await Post.query().withRelated('user');
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
    // const user = await User.query().where({
    //   id: ctx.decoded.id
    // });

    const post = new Post({
      title: ctx.request.body.title,
      slug: ctx.request.body.slug,
      markup: ctx.request.body.markup,
      content: ctx.request.body.content,
      image: ctx.request.body.image,
      author_id: ctx.decoded.id,
      is_public: ctx.request.body.is_public
    });

    await post.save().then((post) => {
      return ctx.created(post);
    });
  } catch (err) {
    return ctx.error('Uh oh there was a problem!');
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
    const user = await User.query().where({ username: ctx.params.username }).first();

    await Post.query().where({ author_id: user.id })
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
 * Looks for a post matching the title
 * @param  {postTitle}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the Post object.
 */
export const getPostByTitle = async (ctx) => {
  ctx.body = await PostService.getPostByTitle(ctx.params.postTitle);
};
