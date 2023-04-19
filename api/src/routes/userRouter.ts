import { Router, Request, Response } from "express";
import {
  getUsersHandler,
  postUser,
  deleteUsers,
  // handleLogin,
  addCoursesById,
  getUserId,
  // handleLogout
} from "../handlers/usersHandlers";
import axios from "axios";

const usersRouter = Router();

interface IUsersHandler {
  (req: Request, res: Response): void;
}
// Usuarios
usersRouter.get("/", getUsersHandler as IUsersHandler);
usersRouter.get("/:id", getUserId as IUsersHandler)
usersRouter.post("/", postUser as IUsersHandler);
usersRouter.get("/:id", getUserId as IUsersHandler)
usersRouter.delete("/:id", deleteUsers as IUsersHandler);
usersRouter.put("/addCourses", addCoursesById as IUsersHandler);

// Autenticacion
// usersRouter.post("/login", handleLogin as IUsersHandler);
// usersRouter.post("/logout", handleLogin as IUsersHandler);

export default usersRouter;
