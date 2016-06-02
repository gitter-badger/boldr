import Models from '../../db/models';
const Article = Models.Article;
const User = Models.User;
const Tag = Models.Tag;

export async function getAllTags(ctx) {
  const tags = await Tag.findAll({});
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
    tagname: ctx.request.body.tagname,
    description: ctx.request.body.description
  };
  try {
    const newTag = await Tag.create(tag);
    return ctx.created(newTag);
  } catch (err) {
    return ctx.error('There was an error!');
  }
};
