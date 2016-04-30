import Router from 'koa-router';
import { getAllPosts, createPost } from './post.controller';

const postRouter = new Router({ prefix: '/api/v1/posts' });

postRouter
    .get('/', getAllPosts)
    .post('/', createPost);


export default postRouter;
