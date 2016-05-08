import _debug from 'debug';
import Article from '../../db/models/article';
import Tag from '../../db/models/tag';

const debug = _debug('boldr:tag:controller');
debug('init');

export async function getAllTags(ctx) {
  console.log(ctx.session)
  const tags = await Tag.getJoin({article: true}).run();
  ctx.body = tags;
}

/**
 * @description
 * creates a new tag in the db.
 * @route /api/v1/tags
 * @method POST
 */
export const createTag = async (ctx, next) => {
  try {
    Tag.save({
      name: ctx.request.body.name,
      description: ctx.request.body.description
    }).run();
    ctx.status = 201;
  } catch (err) {
    return ctx.error('There was an error!');
  }
};

/**
 * Performs a lookup of a user by their username.
 * @param  {[type]}   ctx  context of the request
 * @param  {Function} next continue to the next middleware
 * @return {Object}        the User object.
 */
// export async function getPostsByAuthor(ctx, next) {
//   try {
//     const user = await User.where('username', ctx.params.username).fetch({
//       columns: ['display_name', 'username', 'id', 'avatar', 'email']
//     });

//     await Post.query('where', 'author_id', user.id).fetchAll()
//       .then((posts) => {
//         if (posts) {
//           ctx.status = 200;
//           ctx.body = posts;
//         }
//       });
//   } catch (err) {
//     ctx.body = err;
//   }
// }
