import { Request, Response } from "express";
import {
  getUsersController,
  createUser,
  deleteById,
  loginUser, 
  // logoutUser,
  // refreshAccessToken
} from "../controllers/usersControllers";
import { IUser } from "../utils/types";
import Users from "../model/users";
import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface  IObjEmail {
  host: string | undefined,
  port: string | undefined,
  secure: boolean,
  auth: {
    user: string | undefined,
    pass: string | undefined,
  }
}

const ObjEmail:  IObjEmail = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
};


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
  const nombreRemitente: string = req.body.nombre;
  const correoRemitente: string = req.body.correo;
  const asunto: string = req.body.asunto || "Registro compleado."
  const mensaje: string = req.body.mensaje || "Felicidades por formar parte de fromzerotodev."

  const smtpConfig = JSON.parse(process.env.SMTP_CONFIG || '{}');

  const transporter = nodemailer.createTransport(smtpConfig || ObjEmail);
  try {
    const user = req.body as IUser;
    const createdUser = await createUser(user);
    await transporter.sendMail({
      from: `"${nombreRemitente}" <${correoRemitente}>`,
      to: createdUser.email,
      subject: asunto,
      text: mensaje
    });
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteUsers = async (
  req: Request,
   res: Response
   )  => {
  try {
    const { id } = req.params;
    const users = await Users.findById(id);
    const deleteCourse = await deleteById(id)
    if (!users) {
      return res.status(400).json({ message: 'el ID es invalido' });
    }
    return res.status(200).json(deleteCourse);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
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

// export const handleRefreshAccessToken = async (req: Request, res: Response) => {
//   try {
//     await refreshAccessToken(req, res);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };