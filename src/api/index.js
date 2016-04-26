import express from 'express';
import * as userController from 'api/user/user.controller';
import userRouter from 'api/user/user.routes';
import authRouter from 'api/auth/auth.routes';

const router = express.Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);

router.get('/', (req, res) => res.send('[ API UP ]'));

export default router;
