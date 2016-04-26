import { Router } from 'express';
import * as UserController from './user.controller';

const userRouter = new Router();

userRouter.get('/test', (req, res) => res.send('users'));
userRouter.get('/:id', UserController.getUserById);
userRouter.get('/email/:email', UserController.getUserByEmail);
userRouter.get('/username/:username', UserController.getUserByUsername);

export default userRouter;
