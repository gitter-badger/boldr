import Router from 'koa-router';
import { createUpload } from './upload.controller';

const uploadRouter = new Router({ prefix: '/api/v1/uploads' });

uploadRouter
    .post('/', createUpload);


export default uploadRouter;
