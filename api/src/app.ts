import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();
const app = express();


// MIDDLEWARES
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
  });
  


app.get('/', (req: Request, res: Response) => {
  res.send('esta funcionando correctamente el get');
});

export default app;
