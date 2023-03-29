import { Types } from "mongoose";

export interface ICourse {
    user_id: Types.ObjectId;
    name: string;
    description: string;
    image: string;
    difficulty: string;
    duration: number;
    price: number;
    video: string;
    created_at: Date;
    updated_at: Date;
  }