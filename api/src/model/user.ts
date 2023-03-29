import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    created_at: {
         type: Date, 
         default: Date.now
     },
     updated_at: { 
        type: Date, 
        default: Date.now
     }
})

const User = mongoose.model('User', userSchema);
module.exports = User
