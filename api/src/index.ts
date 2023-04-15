import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import app from './app';


const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI!, {
 // useNewUrlParser: true,
 // useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error(error));

// Configurar eventos para la conexión de MongoDB
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado a la base de datos'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
