import { Types } from "mongoose";

export type difficulty = "Easy" | "Medium" | "Advanced"

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
    created_at: Date;
    updated_at: Date;
  }

//TIPOS USUARIOS
export interface IUser {
  email: string,
  password: string,
  username: string,
  lastname: string,
  image: string,
  firstname: string,
  favorites: Types.ObjectId[],
  roles: Types.ObjectId[] 
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