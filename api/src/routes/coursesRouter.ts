import { Router, Request, Response } from 'express';

const router = Router();

import getCoursesHandler from '../handlers/coursesHandlers';

interface ICoursesHandler {
  (req: Request, res: Response): void;
}

router.get('/', getCoursesHandler as ICoursesHandler);

export default router;
