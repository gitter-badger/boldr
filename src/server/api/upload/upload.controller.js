import config from 'config';
import multer from 'koa-multer';
import convert from 'koa-convert';
import path from 'path';

// This uploads locally
const storage = multer.diskStorage({
  destination(ctx, file, cb) {
    cb(null, `${config.PATH_BASE}/static/uploads`);
  },
  filename(ctx, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });
