import { Types } from "mongoose";

export type difficulty = "Easy" | "Medium" | "Advanced"

interface Review {
  username: string;
  comment:string;
}
//TIPOS CURSO
export interface ICourse {
    user_id: Types.ObjectId;
    name: string;
    description: string;
    image: string;
    difficulty: difficulty;
    duration: number;
    price: number;
    video: string;
    reviews: Review[];
    created_at: Date;
    updated_at: Date;
  }

//TIPOS USUARIOS
export interface IUser {
  id: string,
  username: string,
  email: string,
  password: string,
  lastname: string,
  image: string,
  firstname: string,
<<<<<<< HEAD
  favorites: Types.ObjectId[],
  roles: Types.ObjectId[] 
=======
  favorites: string,
  role: string;
  token: string | null;
>>>>>>> c5feb7a327fb4f3a3a6e95daa19944d0d8f6dd6e
  created_at: Date,
  updated_at: Date
}

//TIPOS ADMINISTRADORES

export interface IAdmin {
  admin_id: Types.ObjectId,
  name: string,
  email: string,
  admname: string,
  password: string,
  lastname: string,
  firstname: string,
  image: string,
  create_at: Date,
  update_at: Date
}

//TIPOS DE ROLES

export interface IRoles {
  name: string
}