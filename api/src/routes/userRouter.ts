import { Router, Request, Response } from "express";
import { getUsersHandler } from "../handlers/usersHandlers";

const usersRouter = Router();

interface IUsersHandler {
  (req: Request, res: Response): void;
}

usersRouter.get("/", getUsersHandler as IUsersHandler);

export default usersRouter;
