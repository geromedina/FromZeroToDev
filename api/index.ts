import mongoose from "mongoose"
import app from "./src/app"

require('dotenv').config()

const PORT = 3001

app.listen(PORT, () => {
    console.log(`el puerto ${PORT} esta activo`);
    mongoose.connect(process.env.MONGODB_URI as string)
        .then(() => console.log('connected mongodb atlas'))
        .catch((error: Object) => console.error(error))
})
