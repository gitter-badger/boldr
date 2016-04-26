import { Router } from 'express';
import * as UserController from 'api/user/user.controller';

const authRouter = new Router();

authRouter.get('/test', (req, res) => res.send('auth'));

authRouter.post('/register', UserController.registerUser);
authRouter.post('/login', UserController.loginUser);

export default authRouter;
