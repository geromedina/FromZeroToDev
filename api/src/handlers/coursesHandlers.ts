import { Request, Response } from 'express';
import getCourses from '../controllers/coursesController';

const getCoursesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await getCourses();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export default getCoursesHandler;
