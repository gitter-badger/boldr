// slug = require('limax');
import { Article, User, Tag } from '../../db/models';
import Boom from 'boom';

/**
 * @api {get} /tags       Get all tags
 * @apiVersion 1.0.0
 * @apiName getAllTags
 * @apiGroup Tag
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3000/api/v1/tags
 *
 * @apiSuccess {String}  id           The Tag ID
 * @apiSuccess {String}  tagname      The name of the tag
 * @apiSuccess {String}  description  The description of the tag
 */
export const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.findAll({});

    return res.status(200).json(tags);
  } catch (error) {
    Boom.badRequest({ message: error });
    next(error);
  }
};
