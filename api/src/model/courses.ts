import mongoose from "mongoose";
import { Schema } from "mongoose";

const coursesSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user_id: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    difficulty_id: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    price: {
        type: Number, 
        required: true,
        min: 0,
        max: 1000 
       },
    video: {
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
    }
)