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

/*
saveAttachments: Promise.method(function(r, attachments) {
  var arrayOfAttachments = [];
  return Promise.map(attachments, function(attachment) {
    if (typeof attachment.content !== 'undefined') {
      delete attachment.content; // We don't want to store the content in the database
    }
    if (typeof attachment.stream !== 'undefined') {
      delete attachment.stream; // We don't want to store unreadable stream
    }
    return self
    .insertAttachment(r, attachment)
    .then(function(attachmentId) {
      return arrayOfAttachments.push(attachmentId);
    })
  }, { concurrency: 3 })
  .then(function() {
    return arrayOfAttachments;
  })
})
 */
// This uploads locally
const storage = multer.diskStorage({
  destination(ctx, file, cb) {
    cb(null, `${config.PATH_BASE}/uploads`);
  },
  filename(ctx, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // eslint-disable-line
  }
});

export const upload = multer({ storage });
