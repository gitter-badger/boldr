import config from 'config';
// import AWS from 'aws-sdk';
import multer from 'koa-multer';
import _debug from 'debug';
// import multerS3 from 'multer-s3';
import path from 'path';
import convert from 'koa-convert';

const debug = _debug('upload');
// const s3 = new AWS.S3();
// const s3 = new aws.S3({
//   secretAccessKey: config.AWS.config.secretAccessKey,
//   accessKeyId: config.AWS.config.accessKeyId,
//   region: 'us-west-1'
// });
//
// const multerOptions = {
//   storage: multerS3({
//     s3,
//     dirname: 'uploads',
//     bucket: config.AWS.s3.bucket,
//     secretAccessKey: config.AWS.config.secretAccessKey,
//     accessKeyId: config.AWS.config.accessKeyId,
//     region: 'us-west-1',
//     s3ForcePathStyle: true,
//     endpoint: config.AWS.config.endpoint && new aws.Endpoint(config.AWS.config.endpoint),
//     filename(req, file, cb) {
//       const fileName = `${Date.now().toString()}-${file.originalname}`;
//       cb(null, fileName);
//     }
//   }),
//   fileFilter: function fileFilter(req, file, cb) {
//     // TODO: Create a filter
//     cb(null, true);
//   }
// };
// This uploads locally
const storage = multer.diskStorage({
  destination(ctx, file, cb) {
    cb(null, `${config.PATH_BASE}/uploads`);
  },
  filename(ctx, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // eslint-disable-line
  }
});

export const uploadFile = (ctx, next) => {
  try {
    debug(ctx.files);
    const filename = Object.keys(ctx.files)[0];
    if (!filename) {
      ctx.type = 'json';
      ctx.status = 400;
      ctx.body = { error: 'upload error' };
      return;
    }
    const { name, mimetype, buffer } = ctx.files[filename];
    return ctx.created({ name, mimetype });
  } catch (error) {
    debug(error);
  }
};

export const upload = multer({ storage });
