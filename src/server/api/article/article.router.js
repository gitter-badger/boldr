/**
 * server/api/article/article.router
 * Article route handlers
 *
 * @exports {articleRouter}
 */

import Router from 'koa-router';
import * as controller from './article.controller';
import { isAuthenticated } from '../../auth';
const articleRouter = new Router({ prefix: '/api/v1/articles' });

articleRouter
    .get('/', controller.getAllArticles)
    .post('/', isAuthenticated(), controller.createArticle)
    .get('/:id', controller.showArticle)
    .get('/slug/:slug', controller.getArticleBySlug)
    .put('/:id', isAuthenticated(), controller.update)
    .delete('/:id', isAuthenticated(), controller.destroy)
    .get('/author/:userId', controller.getArticleByAuthor);

export default articleRouter;
