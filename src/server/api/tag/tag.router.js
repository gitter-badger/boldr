import Router from 'koa-router';
import { getAllTags, createTag } from './tag.controller';
import { validateToken } from '../../auth/validateToken';

const tagRouter = new Router({ prefix: '/api/v1/tags' });

tagRouter
    .get('/', getAllTags)
    .post('/', validateToken, createTag);

export default tagRouter;
