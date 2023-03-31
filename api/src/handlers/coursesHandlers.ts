import { Request, Response } from "express";
import { getCourses, createCourse } from "../controllers/coursesController";
import { ICourse } from "../Utils/types";

// MANEJADOR QUE TRAE LOS COURSES

export const getCoursesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getCourses();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//MANEJADOR QUE CREA LOS CURSOS

export const postCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course = req.body as ICourse;
    const createdCourse = await createCourse(course);
    res.status(200).json(createdCourse);
  } catch (error) {
    res.status(400).json();
  }
};
