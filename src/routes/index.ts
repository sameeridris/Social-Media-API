import { Router } from 'express';
import apiRoutes from './api/index.ts';
const router = Router();

router.use('/api', apiRoutes);

export default router;
