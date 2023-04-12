import express, { Router, Request, Response } from "express";
import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const emailRouter = Router();

interface  IObjEmail {
  host: string | undefined,
  port: string | undefined,
  secure: boolean,
  auth: {
    user: string | undefined,
    pass: string | undefined,
  }
}

const ObjEmail:  IObjEmail = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
};

emailRouter.use(express.urlencoded({ extended: true }));

emailRouter.post('/enviar-correo', async (req: Request, res: Response) => {
  const nombreRemitente: string = req.body.nombre;
  const correoRemitente: string = req.body.correo;
  const asunto: string = req.body.asunto;
  const mensaje: string = req.body.mensaje;

  const smtpConfig = JSON.parse(process.env.SMTP_CONFIG || '{}');

  const transporter = nodemailer.createTransport(smtpConfig || ObjEmail);
  
  try {
    await transporter.sendMail({
      from: `"${nombreRemitente}" <${correoRemitente}>`,
      to: 'ramiroignacio_14@hotmail.com',
      subject: asunto,
      text: mensaje
    });

    return res.status(200).json({ message: 'Correo electrónico enviado correctamente.' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al enviar el correo electrónico.' });
  }
});

export default emailRouter;
