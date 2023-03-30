import { Request, Response } from "express";
import {
  getUsersController,
  createUser,
} from "../controllers/usersControllers";
import { IUser } from "../utils/types";

export const getUsersHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getUsersController();
    res.status(200).json(response);
  } catch (error: any) {
    console.log("hay una error");
    res.status(400).json({ error });
  }
};
//MANEJADOR QUE CREA LOS USUARIOS
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body as IUser;
    const createdUser = await createUser(user);
    res.status(200).json(createdUser);
  } catch(error) {
    res.status(400).json({ error });
  }
};
