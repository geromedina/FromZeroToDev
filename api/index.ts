import express, {Request, Response, NextFunction} from 'express';
import mongoose from "mongoose"
require('dotenv').config()
import userRoute from "./routes/user"
const router = require('express').Router()

// const app = express()
// //middleware
// app.use(express.json())
// app.use('/api', userRoute) 
// //route
// app.get('/', (req: Request, res:Response) => {
//     res.send('esta funcionando correctamente el get')
// })

//mongoDB conexion 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected mongodb atlas'))
.catch((error:Object) => console.error(error))

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`el puerto ${PORT} esta activo`)
})