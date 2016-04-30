import Router from 'koa-router';
import { getAllPosts, createPost } from './post.controller';
import { validateToken } from '../../auth/validateToken';
const postRouter = new Router({ prefix: '/api/v1/posts' });

postRouter
    .get('/', validateToken, getAllPosts)
    .post('/', validateToken, createPost);


export default postRouter;
