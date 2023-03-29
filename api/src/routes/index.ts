import { Router } from 'express';
import coursesRouter from './coursesRouter';

const router = Router();

router.use('/courses', coursesRouter);

export default router;
