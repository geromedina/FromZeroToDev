import { Router, Request, Response } from "express";
import {getCoursesHandler, getCourseID, postCourse} from "../handlers/coursesHandlers";
//import { Course } from "../model/courses";

const coursesRouter = Router();

interface ICoursesHandler {
  (req: Request, res: Response): void;
}

coursesRouter.get("/", getCoursesHandler as ICoursesHandler);

coursesRouter.get("/:id", getCourseID as ICoursesHandler);

coursesRouter.post("/", postCourse as ICoursesHandler)



export default coursesRouter;
