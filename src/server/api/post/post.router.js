import Router from 'koa-router';
import { getAllPosts, createPost, getPostsByAuthor } from './post.controller';
import { validateToken } from '../../auth/validateToken';
const postRouter = new Router({ prefix: '/api/v1/posts' });

postRouter
    .get('/', getAllPosts)
    .post('/', validateToken, createPost);

postRouter.get('/author/:username', getPostsByAuthor);

export default postRouter;
