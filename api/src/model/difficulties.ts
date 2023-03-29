import mongoose from "mongoose";
import { Schema } from "mongoose";

const difficultiesSchema = new Schema({
    name: {
        type: String,
        require: true
    } 
})

const Difficulties = mongoose.model('difficulties', difficultiesSchema);
module.exports = Difficulties