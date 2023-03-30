import { Router, Request, Response } from "express";
import getCoursesHandler from "../handlers/coursesHandlers";

const coursesRouter = Router();

interface ICoursesHandler {
  (req: Request, res: Response): void;
}

coursesRouter.get("/", getCoursesHandler as ICoursesHandler);

export default coursesRouter;
