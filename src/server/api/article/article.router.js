import Router from 'koa-router';
import { getAllArticles, createArticle, showArticle, getArticleBySlug } from './article.controller';
import { validateToken } from '../../auth/validateToken';

const articleRouter = new Router({ prefix: '/api/v1/articles' });

articleRouter
    .get('/', getAllArticles)
    .post('/', validateToken(), createArticle)
    .get('/:id', showArticle)
    .get('/slug/:slug', getArticleBySlug);

export default articleRouter;
