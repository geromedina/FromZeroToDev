import { Request, Response } from "express";
import {
  getUsersController,
  createUser,
  deleteById,
  loginUser,
  findUserController,
  addCoursesToUserController,
  // logoutUser,
  refreshAccessToken
} from "../controllers/usersControllers";
import { IUser } from "../utils/types";
import Users from "../model/users";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"



const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

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
  const asunto: string = req.body.asunto || "Deseamos que disfrutes de Fromzerotodev";
  const mensaje: string = req.body.mensaje || "Estamos agradecidos de que formes partes de esta nueva experiencia para ti, estamos para brindarte la mejor experiencia y logres ser el mejor programador."

  const smtpConfig = JSON.parse(process.env.SMTP_CONFIG || '{}');

  const transporter = nodemailer.createTransport(smtpConfig || ObjEmail);
  try {
    const { nickname, password, email, firstname, lastname, image } = req.body as IUser;
    if (!nickname || !password || !email || !firstname || !lastname || !image) {
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const userWithTokens = {
      ...req.body,
      password: hashedPassword,
      token: '',
      refreshToken: '',
    };
    const createdUser = await Users.create(userWithTokens);
    await transporter.sendMail({
      from: `"${nombreRemitente}" <${correoRemitente}>`,
      to: createdUser.email,
      subject: asunto,
      text: mensaje
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
    res.status(400).json({ error: `Ocurrió un error al crear el usuario: ${error.message}` });
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
