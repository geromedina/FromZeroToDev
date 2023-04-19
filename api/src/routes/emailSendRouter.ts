import express, { Router, Request, Response } from "express";
import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.SMTP_CONFIG)

const emailRouter = Router();



emailRouter.use(express.urlencoded({ extended: true }));

emailRouter.post('/enviar-correo', async (req: Request, res: Response) => {

  

  try {
 
    return res.status(200).json({ message: 'Correo electrónico enviado correctamente.' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al enviar el correo electrónico.' });
  }
});

export default emailRouter;
