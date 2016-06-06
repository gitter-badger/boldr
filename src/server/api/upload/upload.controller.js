import config from 'config';
import aws from 'aws-sdk';
import multer from 'koa-multer';
import multerS3 from 'multer-s3';
import convert from 'koa-convert';
import crypto from 'crypto';
import path from 'path';

const s3 = new aws.S3({
  secretAccessKey: config.aws.config.secretAccessKey,
  accessKeyId: config.aws.config.accessKeyId,
  region: 'us-west-1'
});

const multerOptions = {
  storage: multerS3({
    s3,
    bucket: config.aws.s3.bucket,
    secretAccessKey: config.aws.config.secretAccessKey,
    accessKeyId: config.aws.config.accessKeyId,
    region: config.aws.config.region,
    acl: 'public-read',
    endpoint: config.aws.config.endpoint && new aws.Endpoint(config.aws.config.endpoint),
    metadata(ctx, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(ctx, file, cb) {
      cb(null, `uploads/${file.fieldname}-${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  })
};
// This uploads locally
const storage = multer.diskStorage({
  destination(ctx, file, cb) {
    cb(null, `${config.PATH_BASE}/uploads`);
  },
  filename(ctx, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()); // eslint-disable-line
  }
});

export const upload = multer(multerOptions);
