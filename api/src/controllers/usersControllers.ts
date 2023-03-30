import Users from "../model/users";

export const getUsersContr = async () => {
  try {
    const users = await Users.find();
    return users;
  } catch (error) {
    throw new Error("Error al buscar los usuarios en la base de datos");
  }
};
