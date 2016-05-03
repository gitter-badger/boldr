import Router from 'koa-router';
import { getAllPosts, createPost, getPostsByAuthor, getPostByTitle } from './post.controller';
import { validateToken } from '../../auth/validateToken';

const postRouter = new Router({ prefix: '/api/v1/posts' });

postRouter
    .get('/', getAllPosts)
    .post('/', validateToken, createPost)
    .get('/author/:username', getPostsByAuthor)
    .get('/title/:postTitle', getPostByTitle);

export default postRouter;
