import Router from 'koa-router';
import { getAllPosts } from './post.controller';

const postRouter = new Router({ prefix: '/api/v1/posts' });

postRouter
    .get('/', getAllPosts);


export default postRouter;
