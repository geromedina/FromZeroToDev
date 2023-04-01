import {connect} from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB = connect(process.env.MONGODB_URI as string)
.then(() => console.log('connected mongodb atlas'))
.catch((error) => console.error(error))


// export const connectDB = () => {
//     try {
//         connect(process.env.MONGODB_URI as string, (error:any):never => {
//  if(error) throw new Error("invalid connection")
//  console.log("connection succesfull")
//         })
//     } catch (error) {console.log(error.message);
//     }
// }