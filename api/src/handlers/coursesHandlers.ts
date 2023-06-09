import { Request, Response, ErrorRequestHandler } from "express";
import {
  getCourses,
  createCourse,
  getCoursesByName,
  getCourseById,
  updateCourseById,
  deleteById,
  getAllCourses
} from "../controllers/coursesController";
import { ICourse } from "../utils/types";
import { Course } from "../model/courses";

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

export const getAllCoursesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getAllCourses();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
// MANEJADOR QUE TRAE UN CURSO POR ID

export const getCourseID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const response = await getCourseById(id);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

// MANEJADOR QUE ACTUALIZA UN CURSO POR ID
export const updateCourseByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const courseUpdates = req.body as ICourse;
    const updatedCourse = await updateCourseById(id, courseUpdates);
    res.status(200).json(updatedCourse);
  } catch (error: any) {
    res.status(500).send(error.message);
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
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    const deleteCourse = await deleteById(id);
    if (!course) {
      return res.status(400).json({ message: "el ID es invalido" });
    }
    return res.status(200).json(deleteCourse);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

