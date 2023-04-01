import { Router, Request, Response } from "express";
import { getUsersHandler, postUser } from "../handlers/usersHandlers";


const usersRouter = Router();

interface IUsersHandler {
  (req: Request, res: Response): void;
}

usersRouter.get("/", getUsersHandler as IUsersHandler);

usersRouter.post("/", postUser as IUsersHandler)


// usersRouter.post("/", async (req: Request, res:Response) => {
//     const newUser = req.body
//     await
// } )
export default usersRouter;
