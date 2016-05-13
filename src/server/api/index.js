import versionRouter from './version/version.router';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import articleRouter from './article/article.router';
import tagRouter from './tag/tag.router';
import uploadRouter from './upload/upload.router';
import settingRouter from './setting/setting.router';
import pageRouter from './page/page.router';
import menuRouter from './menu/menu.router';

export default [
  versionRouter,
  articleRouter,
  userRouter,
  authRouter,
  tagRouter,
  uploadRouter,
  settingRouter,
  pageRouter,
  menuRouter
];
