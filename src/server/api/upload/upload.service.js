import config from 'config';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
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
      cb(null, `uploads/files/${file.fieldname}-${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  })
};

const multerAvatar = {
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
      cb(null, `uploads/avatars/${file.fieldname}-${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  })
};

const multerArticle = {
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
      cb(null, `uploads/articles/${file.fieldname}-${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  })
};

export { multerOptions, multerAvatar, multerArticle };
