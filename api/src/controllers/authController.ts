// import { MongoClient } from "mongodb";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { Request, Response } from "express";
// import dotenv from "dotenv";
// dotenv.config();

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// const uri = "mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   try {
//     await client.connect();
//     const database = client.db("<dbname>");
//     const collection = database.collection("<collectionname>");
//     const user = await collection.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email" });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({ error: "Invalid password" });
//     }
//     const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
//       expiresIn: "3h",
//     });
//     const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
//       expiresIn: "7d",
//     });
//     await collection.updateOne(
//       { _id: user._id },
//       { $set: { token: accessToken } }
//     );
//     res.status(200).json({ accessToken, refreshToken, user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   } finally {
//     await client.close();
//   }
// };

import { MongoClient, Collection, Db } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  token?: string;
}

const uri = "mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export const loginUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { email, password } = req.body;
  try {
    await client.connect();
    const database: Db = client.db("<dbname>");
    const collection: Collection<IUser> = database.collection("<collectionname>");
    const user: IUser | null = await collection.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const isPasswordMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const accessToken: string = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const refreshToken: string = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    await collection.updateOne(
      { id: user.id },
      { $set: { token: accessToken } }
    );
    return res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    await client.close();
  }
};
