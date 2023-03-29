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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        require: true
    },
    image: {
        type: String,
        require: true
    },
    difficulty: {
        type: String,
         enum: ['Easy', 'Medium', 'Advanced'],
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
       course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchases'
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

const Course = mongoose.model('Course', coursesSchema);
module.exports = Course