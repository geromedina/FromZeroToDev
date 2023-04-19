import { Request, Response } from "express";
import {
  getUsersController,
  updateUser,
  createUser,
  deleteById,
  loginUser,
  findUserController,
  addCoursesToUserController,
  // logoutUser,
  refreshAccessToken,
  getUserById
} from "../controllers/usersControllers";
import { IUser } from "../utils/types";
import Users from "../model/users";

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

// MANEJADOR QUE TRAE UN USUARIO POR ID

export const getUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const response = await getUserById(id);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

//  FUNCION QUE ACTUALIZA INFORMACION DEL USUARIO
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updatedUser = await updateUser(id, dataToUpdate);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};


//MANEJADOR QUE CREA LOS USUARIOS
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body as IUser;
    const createdUser = await createUser(user);
    res.status(200).json(createdUser);
  } catch (error: any) {
    const message = error.message.toLowerCase();
    if (message.includes("email")) {
      res.status(409).json({ error: "Ya existe un usuario con el mismo email" });
    } else if (message.includes("nickname")) {
      res.status(409).json({ error: "Ya existe un usuario con el mismo nickname" });
    } else {
      res.status(400).json({ error: "Ocurrió un error al crear el usuario" });
    }
  }
};

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await Users.findById(id);
    const deleteCourse = await deleteById(id);
    if (!users) {
      return res.status(400).json({ message: "el ID es invalido" });
    }
    return res.status(200).json(deleteCourse);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// export const getUserByEmail = async (req: Request, res: Response) => {
//   const { email } = req.params;
//   try {
//     const user = await findUserController(email);
//     res.status(200).json(user);
//   } catch (error) {
//     throw new Error(`${error}`);
//   }
// };

export const addCoursesById = async (req: Request, res: Response) => {
  const { coursesId, userEmail } = req.body;
  try {
    const response = await addCoursesToUserController(coursesId, userEmail);
    res.status(201).json(response);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

// export const handleLogout = async (req: Request, res: Response) => {
//   try {
//     await logoutUser(req, res);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


export const handleRefreshAccessToken = async (req: Request, res: Response) => {
  try {
    await refreshAccessToken(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
