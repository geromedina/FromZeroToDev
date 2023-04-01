import { Router, Request, Response } from "express";
import { getCoursesHandler, postCourse } from "../handlers/coursesHandlers";
import { Course } from "../model/courses";

const coursesRouter = Router();

interface ICoursesHandler {
  (req: Request, res: Response): void;
}

coursesRouter.get("/", getCoursesHandler as ICoursesHandler);

coursesRouter.post("/", postCourse as ICoursesHandler);

export default coursesRouter;
