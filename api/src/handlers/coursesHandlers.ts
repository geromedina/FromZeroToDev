import { Request, Response } from "express";
import { getCourses, getCourseById, createCourse } from "../controllers/coursesController";
import { ICourse } from "../utils/types";
import { id } from "mongoose-typescript";

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

// MANEJADOR QUE TRAE UN CURSO POR ID

export const getCourseID = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const response = await getCourseById(id);
    res.status(200).send(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
}


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
