import _debug from 'debug';
import Post from '../../db/models/post';
import User from '../../db/models/user';
import { returnCode, response, respond } from '../../utils';
const debug = _debug('boldr:post:controller');
debug('init');

const ensurePostAuthor = (id, authorId) => new Promise((resolve, reject) => {
  debug(`Ensuring ${authorId} is creator of ${id} post`);
  Post.where({
    id
  }).fetch().then(result => {
    debug(result);
    if (result.attributes.author_id === parseInt(authorId, 10)) {
      resolve();
    } else {
      debug(`User ${authorId} wanted to update post ${JSON.stringify(result)}`);
      reject();
    }
  }).catch(err => {
    reject(err);
  });
});

export async function getAllPosts(ctx) {
  const authorId = ctx.state.user;
  debug(`Ensuring ${authorId} is creator of post`);
  const posts = await Post.fetchAll({});
  ctx.body = posts;
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
