import versionRouter from './version/version.router';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import postRouter from './post/post.router';
// import uploadRouter from './upload/upload.router'; // Doesnt work yet.
import tagRouter from './tag/tag.router';

export default [
  versionRouter,
  userRouter,
  postRouter,
  authRouter,
  tagRouter
];
