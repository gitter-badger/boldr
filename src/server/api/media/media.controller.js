// slug = require('limax');
import { Media, User, Category } from '../../db/models';
import Boom from 'boom';

/**
 * @api {get} /medias       Get all media files
 * @apiVersion 1.0.0
 * @apiName getAllMedia
 * @apiGroup Media
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3000/api/v1/medias
 *
 * @apiSuccess {String}  id   The File ID
 */
export const getAllMedia = async (req, res, next) => {
  try {
    const medias = await Media.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name', 'displayName', 'picture', 'email', 'role']
      }]
    });

    return res.status(200).json(medias);
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /medias/:id  Get a specific file by its id
 * @apiVersion 1.0.0
 * @apiName showMedia
 * @apiGroup Media
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3000/api/v1/medias/1
 *
 * @apiParam {String}    id   The medias's id.
 *
 * @apiSuccess {String}  id   The Media ID
 */
export const showMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'name', 'displayName', 'picture', 'email', 'role']
      }]
    });
    return res.status(200).json(media);
  } catch (error) {
    next(error);
  }
};
