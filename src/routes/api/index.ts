import { Router } from 'express';
import { thoughtsRouter } from './thoughtsRoutes.ts';
import { usersRouter } from './usersRoutes.ts';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', usersRouter);

export default router;