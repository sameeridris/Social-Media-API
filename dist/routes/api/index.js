import { Router } from 'express';
import thoughtsRouter from '../api/thoughtsRoutes';
import usersRouter from '../api/usersRoutes';
const router = Router();
router.use('/thoughts', thoughtsRouter);
router.use('/users', usersRouter);
export default router;
