import Router from 'koa-router';
import { getAllPosts, createPost } from './post.controller';
import decodeToken from '../../middleware/auth/decodeToken';
const postRouter = new Router({ prefix: '/api/v1/posts' });

postRouter
    .get('/', getAllPosts)
    .post('/', decodeToken, createPost);


export default postRouter;
