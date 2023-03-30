import { Router, Request, Response } from "express";
import getCoursesHandler from "../handlers/coursesHandlers";
import { Course } from "../model/courses";

const coursesRouter = Router();

interface ICoursesHandler {
  (req: Request, res: Response): void;
}

coursesRouter.get("/", getCoursesHandler as ICoursesHandler);
coursesRouter.post("/", async (req: Request, res: Response) => {
  const newCourse = req.body;
  await Course.create(newCourse);
  res.status(201).json(newCourse);
});

export default coursesRouter;
