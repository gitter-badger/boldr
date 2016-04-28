import _debug from 'debug';
import Post from '../../db/models/post';
import { returnCode, response, respond } from '../../utils';
const debug = _debug('boldr:post:controller');
debug('init');


export async function getAllPosts(ctx) {
  const authorId = ctx.decoded;
  const posts = await Post.fetchAll({});
  ctx.body = posts;
}
