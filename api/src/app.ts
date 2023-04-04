import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";

const app = express();

// MIDDLEWARES
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use(router);

export default app;
