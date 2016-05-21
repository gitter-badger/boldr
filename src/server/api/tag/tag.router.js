import Router from 'koa-router';
import { getAllTags, createTag } from './tag.controller';

// import isRole from 'server/auth/policy/isRole';
const tagRouter = new Router({ prefix: '/api/v1/tags' });

tagRouter
    .get('/', getAllTags)
    .post('/', createTag);

export default tagRouter;
