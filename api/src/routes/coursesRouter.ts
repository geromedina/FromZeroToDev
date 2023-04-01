import { Router, Request, Response } from "express";
import {
  getCoursesHandler,
  postCourse,
  getCourseID,
  updateCourseByIdHandler
} from "../handlers/coursesHandlers";

const coursesRouter = Router();

interface ICoursesHandler {
  (req: Request, res: Response): void;
}

coursesRouter.get("/", getCoursesHandler as ICoursesHandler);

coursesRouter.get("/:id", getCourseID as ICoursesHandler);

coursesRouter.put("/:id", updateCourseByIdHandler as ICoursesHandler);

coursesRouter.post("/", postCourse as ICoursesHandler);

export default coursesRouter; 
