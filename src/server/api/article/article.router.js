import Router from 'koa-router';
import { getAllArticles, createArticle, showArticle } from './article.controller';
import { checkAuth } from '../../auth/validateToken';

const articleRouter = new Router({ prefix: '/api/v1/articles' });

articleRouter
    .get('/', getAllArticles)
    .post('/', checkAuth(), createArticle)
    .get('/:id', showArticle);

export default articleRouter;
