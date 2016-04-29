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
  }).fetch().then((result) => {
    debug(result);
    if (result.attributes.author_id === parseInt(authorId, 10)) {
      resolve();
    } else {
      debug(`User ${authorId} wanted to update post ${JSON.stringify(result)}`);
      reject();
    }
  }).catch((err) => {
    reject(err);
  });
});

export async function getAllPosts(ctx) {
  const authorId = ctx.decoded;
  const posts = await Post.fetchAll({});
  ctx.body = posts;
}

/**
 * @description
 * registers a new user
 * @route /api/v1/auth/register
 * @method POST
 */
export const createPost = async ctx => {
  Post.forge(ctx.request.body).save();

  ctx.status = 201;
};
