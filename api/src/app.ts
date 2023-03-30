import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send("Error interno del servidor");
//   next();
// });

app.use(router);

// app.get("/", (req: Request, res: Response) => {
//   res.send("esta funcionando correctamente el get");
// });

export default app;
