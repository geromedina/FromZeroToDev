import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../utils/types";
const bcrypt = require("bcrypt");
import dotenv from "dotenv";
import Users from "../model/users";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

//FUNCION QUE TRAE LOS USER
export const getUsersController = async () => {
  try {
    const users = await Users.find();
    return users;
  } catch (error) {
    throw new Error("Error al buscar los usuarios en la base de datos");
  }
};


// FUNCION QUE TRAE INFO DE UN USUARIO POR ID

export const getUserById = async (id: any) => {
  try {
    const infoDB = await Users.findById(id).exec();
    if (infoDB === null) {
      console.log(`No se encontró ningún usuario con ID ${id}`);
    }
    return infoDB;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al buscar el usuario con ID ${id}`);
  }
};

// FUNCION QUE ACTUALIZA INFORMACION DEL USUARIO

export const updateUser = async (id: any, updatedData: Partial<IUser>) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      console.log(`No se encontró ningún usuario con ID ${id}`);
      return null;
    }
    const { nickname, email } = updatedData;

    if (email) {
      const existingUserByEmail = await Users.findOne({ email });
      if (existingUserByEmail && existingUserByEmail._id != id) {
        throw new Error("Ya existe un usuario con el mismo email");
      }
    }

    if (nickname) {
      const existingUserByNickname = await Users.findOne({ nickname });
      if (existingUserByNickname && existingUserByNickname._id != id) {
        throw new Error("Ya existe un usuario con el mismo nickname");
      }
    }

    const updatedUser = await Users.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedUser;
  } catch (error: any) {
    throw new Error(`Ocurrió un error al actualizar el usuario: ${error.message}`);
  }
};


// FUNCION QUE CREA UN  USER
export const createUser = async (user: IUser,): Promise<IUser> => {
  try {
    const { nickname, email, firstname, lastname } = user;
//     if (!nickname || !email || !firstname || !lastname ) {
//       throw new Error("Faltan datos requeridos para crear un Usuario");
//     }

    const existingUserByEmail = await Users.findOne({ email });
    if (existingUserByEmail) {
      throw new Error("Ya existe un usuario con el mismo email");
    }

    const existingUserByNickname = await Users.findOne({ nickname });
    if (existingUserByNickname) {
      throw new Error("Ya existe un usuario con el mismo nickname");
    }
    const userWithTokens = {
      ...user, 
      token: '',
      refreshToken: '',
    };
    const createdUser = await Users.create(userWithTokens);

    const accessToken = jwt.sign({ userId: createdUser.id }, JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const refreshToken = jwt.sign({ userId: createdUser.id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    await Users.findByIdAndUpdate(createdUser._id, { refreshToken });

    return {
      ...createdUser.toJSON(),
      token: accessToken,
      refreshToken: refreshToken,
    } as IUser;
  } catch (error: any) {
    throw new Error(`Ocurrió un error al crear el usuario: ${error.message}`);
  }
};

export const deleteById = async (id: any) => {
  try {
    const infoDB = await Users.findByIdAndDelete(id);
    if (!infoDB) {
      console.log(`No se encontró ningún users con ID ${id}`);
    }
    return infoDB;
  } catch (error) {
    throw new Error(`Ocurrió un error al eliminar usuario: ${error}`);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    user.token = accessToken;
    await user.save();
    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const findUserController = async (email: string) => {
  try {
    const user = await Users.findOne({ email: email });
    console.log(user);
    return user;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const addCoursesToUserController = async (
  coursesId: [],
  userEmail: string
) => {
  const response = Users.updateOne(
    { email: userEmail },
    { $push: { courses: [...coursesId] } }
  );
  return response;
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET_KEY) as {
      userId: string;
    };
    const user = await Users.findById(decoded.userId);
    // If user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ error: "Invalid refresh token" });
    }
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
