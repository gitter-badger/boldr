import * as articleController from './article.controller';
import { processQuery } from '../../lib';
import { isAuthenticated, hasRole } from '../../middleware/auth/authService';

export default (app, router) => {
  router.get('/articles', processQuery, articleController.getAllArticles);
  router.get('/articles/:id', articleController.showArticle);
  router.post('/articles', isAuthenticated(), articleController.createArticle);
};
