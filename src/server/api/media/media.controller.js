import Boom from 'boom';
import AWS from 'aws-sdk';
import { Media, User, Category } from '../../db/models';
import { config } from '../../config/boldr';

const s3 = new AWS.S3({
  accessKeyId: config.aws.id,
  secretAccessKey: config.aws.secret,
  region: 'us-west-1'
});
// const params = {
//   Bucket: config.aws.bucket,
//   Key: attachments[0].filename,
//   Body: attachments[0].data
// };
// s3.upload(params, (err, data) => { });
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
    const media = await Media.find({
      where: {
        id: req.params.id
      },
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
/*
{ IsTruncated: false,
  Contents:
   [ { Key: 'File Name',
       LastModified: 2016-06-24T17:13:22.000Z,
       ETag: '"fa9b614f802524c4853a75c79dc5ca37"',
       Size: 198098,
       StorageClass: 'STANDARD' },
 */
export function getAllAWS(req, res, next) {
  const params = {
    Bucket: config.aws.bucket
  };
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}
