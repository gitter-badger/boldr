import versionRouter from './version/version.router';
import accountRouter from './account/account.router';
import authRouter from './auth/auth.router';
import articleRouter from './article/article.router';
import tagRouter from './tag/tag.router';

export default [
  versionRouter,
  accountRouter,
  articleRouter,
  authRouter,
  tagRouter
];
