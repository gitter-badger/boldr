import Router from 'koa-router';
import { getAllArticles, createArticle, showArticle, getArticleBySlug } from './article.controller';
import { checkAuth } from '../../auth/validateToken';

const articleRouter = new Router({ prefix: '/api/v1/articles' });

articleRouter
    .get('/', getAllArticles)
    .post('/', checkAuth(), createArticle)
    .get('/:id', showArticle)
    .get('/slug/:slug', getArticleBySlug);

export default articleRouter;
