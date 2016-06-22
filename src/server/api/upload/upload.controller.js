import multer from 'koa-multer';

import { multerOptions, multerAvatar, multerArticle } from './upload.service';
import Models from '../../db/models';
const Upload = Models.Upload;
const User = Models.User;
const Tag = Models.Tag;


export const uploadFiles = multer(multerOptions);
export const uploadAvatar = multer(multerAvatar);
export const uploadArticle = multer(multerArticle);

/**
 * Returns a listing of all the uploads in the database.
 * @method getAll
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export async function getAll(ctx) {
  try {
    const uploads = await Upload.findAll({});
    return ctx.ok(uploads);
  } catch (err) {
    return ctx.badRequest('Unable to find any uploads');
  }
}
