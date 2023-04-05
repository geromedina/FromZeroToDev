import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = connect(process.env.MONGODB_URI as string)
  .then(() => console.log("connected mongodb atlas"))
  .catch((error) => console.error(error));
