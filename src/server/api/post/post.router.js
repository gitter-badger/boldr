import Router from 'koa-router';
import * as postController from './post.controller';

const postRouter = new Router({ prefix: '/api/v1/posts' });

// postRouter
//     .get('/', postController.getUsers);


export default postRouter;
