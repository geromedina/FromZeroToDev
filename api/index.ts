import express, {Request, Response, NextFunction} from 'express';
import mongoose from "mongoose"

require('dotenv').config()

const router = require('express').Router()
import {connectDB} from "./src/db"

 const app = express()
// //middleware
 app.use(express.json())
 //app.use('/api', course) 
 //route
 app.get('/', (req: Request, res:Response) => {
     res.send('esta funcionando correctamente el get')
 })

//mongoDB conexion 
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log('connected mongodb atlas'))
// .catch((error:Object) => console.error(error))

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`el puerto ${PORT} esta activo`);
    mongoose.connect(process.env.MONGODB_URI as string)
 .then(() => console.log('connected mongodb atlas'))
 .catch((error:Object) => console.error(error))
})

// app.listen(PORT, ()=> {
//     console.log(`el puerto ${PORT} esta activo`)
// })