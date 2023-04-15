import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";

const app = express();

// Configuración de CORS
const allowedOrigins = ["https://fromzerotodev-production.up.railway.app/", "127.0.0.1:3000"];
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// MIDDLEWARES
app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan("dev"));

app.use(router);

export default app;
