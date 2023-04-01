import { Request, Response } from "express";
import {
  getCourses,
  createCourse,
  getCoursesByName,
} from "../controllers/coursesController";
import { ICourse } from "../Utils/types";

// MANEJADOR QUE TRAE LOS COURSES Y LOS CURSOS POR NOMBRE

export const getCoursesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.query;
  if (name) {
    try {
      const response = await getCoursesByName(name as string);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const response = await getCourses();
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
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
