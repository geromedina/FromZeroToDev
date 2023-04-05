import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";
import { createRoles } from "./roles/roles";

const app = express();
createRoles()

// MIDDLEWARES
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use(router);

export default app;
