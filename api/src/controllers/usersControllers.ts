import Users from "../model/users";
// import { IUser } from "../utils/types"
import { IUser } from "../utils/types";
//FUNCION QUE TRAE LOS USER

export const getUsersController = async () => {
  try {
    const users = await Users.find();
    return users;
  } catch (error) {
    throw new Error("Error al buscar los usuarios en la base de datos");
  }
};
// FUNCION QUE CREA UN USER

export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const { username, password, email, firstname, lastname, image } = user;
    if (!username || !password || !email || !firstname || !lastname || !image) {
      throw new Error("Faltan datos requeridos para crear un Usuario");
    }
    const createdUser = await Users.create(user);
    return createdUser.toJSON() as IUser;
  } catch (error) {
    throw new Error(`Ocurrió un error al crear el usuario: ${error}`);
  }
};
