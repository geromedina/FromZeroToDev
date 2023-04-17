import { Router, Request, Response } from "express";
import { getUsersHandler, postUser, deleteUsers, handleLogin, 
  // handleLogout 
} from "../handlers/usersHandlers";

const usersRouter = Router();

interface IUsersHandler {
  (req: Request, res: Response): void;
}
// Usuarios
usersRouter.get("/", getUsersHandler as IUsersHandler);
usersRouter.post("/", postUser as IUsersHandler);
usersRouter.delete("/:id", deleteUsers as IUsersHandler);

// Autenticacion
usersRouter.post("/login", handleLogin as IUsersHandler);
usersRouter.post("/logout", handleLogin as IUsersHandler);

export default usersRouter;
