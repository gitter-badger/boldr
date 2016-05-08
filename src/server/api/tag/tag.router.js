import Router from 'koa-router';
import { getAllTags, createTag } from './tag.controller';
import { checkAuth } from '../../auth/validateToken';

const tagRouter = new Router({ prefix: '/api/v1/tags' });

tagRouter
    .get('/', getAllTags)
    .post('/', checkAuth(), createTag);

export default tagRouter;
