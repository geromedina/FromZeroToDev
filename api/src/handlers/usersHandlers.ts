import { Request, Response } from "express";
import {
  getUsersController,
  updateUser,
  createUser,
  deleteById,
  getUserById,
  findUserController,
  addCoursesToUserController,
  refreshAccessToken,
} from "../controllers/usersControllers";
import { IUser } from "../utils/types";
import Users from "../model/users";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export interface IObjEmail {
  host: string | undefined;
  port: string | undefined;
  secure: boolean;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
}
// ajklashdkjasdkghjasd
const ObjEmail: IObjEmail = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
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

// MANEJADOR QUE TRAE UN USUARIO POR ID

export const getUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const response = await getUserById(id);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

//  FUNCION QUE ACTUALIZA INFORMACION DEL USUARIO
export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
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
  const nombreRemitente: string = req.body.nombre;
  const correoRemitente: string = req.body.correo;
  const asunto: string = req.body.asunto || "Registro compleado.";
  const mensaje: string =
    req.body.mensaje ||
    "Felicidades por formar parte de fromzerotodev, deseamos que disfrutes de esta nueva experiencia y seas el mejor programador.";

  const smtpConfig = JSON.parse(process.env.SMTP_CONFIG || "{}");

  const transporter = nodemailer.createTransport(smtpConfig || ObjEmail);
  try {

    const { nickname, email, firstname, lastname } = req.body as IUser;
    if (!nickname || !email || !firstname || !lastname) {
      throw new Error("Faltan datos requeridos para crear un Usuario");
    }


    const existingUserByEmail = await Users.findOne({ email });
    if (existingUserByEmail) {
      throw new Error("Ya existe un usuario con el mismo email");
    }

    const existingUserByNickname = await Users.findOne({ nickname });
    if (existingUserByNickname) {
      throw new Error("Ya existe un usuario con el mismo nickname");
    }

    const userWithTokens = {
      ...req.body,

      token: "",
      refreshToken: "",
    };
    const createdUser = await Users.create(userWithTokens);
    await transporter.sendMail({
      from: `"${nombreRemitente}" <${correoRemitente}>`,
      to: createdUser.email,
      subject: asunto,
      text: mensaje,
    });

    const accessToken = jwt.sign({ userId: createdUser.id }, JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const refreshToken = jwt.sign({ userId: createdUser.id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    await Users.findByIdAndUpdate(createdUser._id, { refreshToken });

    res.status(201).json({
      ...createdUser.toJSON(),
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({
        error: `Ocurrió un error al crear el usuario: ${error.message}`,
      });
  }
};

//MANEJA EL BORRADO DE USUARIOS

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

export const addCoursesById = async (req: Request, res: Response) => {
  const { coursesId, userEmail } = req.body;
  try {
    const response = await addCoursesToUserController(coursesId, userEmail);
    res.status(201).json(response);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const handleRefreshAccessToken = async (req: Request, res: Response) => {
  try {
    await refreshAccessToken(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
