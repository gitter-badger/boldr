import _debug from 'debug';
import r from 'server/db';
import Joi from 'joi';
import tagSchema from './tag.schema';

const debug = _debug('boldr:tag:controller');
debug('init');

export async function getAllTags(ctx) {
  const tags = await r.table('tags').run();
  return ctx.ok(tags);
}

/**
 * @description
 * creates a new tag in the db.
 * @route /api/v1/tags
 * @method POST
 */
export const createTag = async (ctx, next) => {
  const tag = {
    name: ctx.request.body.name,
    description: ctx.request.body.description
  };
  try {
    // validate the tag (ctx.request.body) against the tagSchema defined
    const parsed = Joi.validate(tag, tagSchema);
    if (parsed.error !== null) {
      throw new Error(parsed.error.details[0].message);
    }
    await r.table('tags').insert(parsed.value).run();
    return ctx.created(parsed.value);
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
