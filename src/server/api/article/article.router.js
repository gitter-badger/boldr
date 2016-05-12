import Router from 'koa-router';
import * as controller from './article.controller';
import { checkAuth } from '../../auth/validateToken';
// import { isAuthenticated } from '../../auth/local/passport';
const articleRouter = new Router({ prefix: '/api/v1/articles' });

articleRouter
    .get('/', controller.getAllArticles)
    .post('/', checkAuth(), controller.createArticle)
    .get('/:id', controller.showArticle)
    .get('/slug/:slug', controller.getArticleBySlug)
    .put('/:id', checkAuth(), controller.update)
    .delete('/:id', checkAuth(), controller.destroy);

export default articleRouter;
