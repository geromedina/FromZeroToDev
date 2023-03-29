import mongoose from "mongoose";
import { Schema } from "mongoose";

const usersFavorites = new Schema({
    user_id: {
        type: Number,
        require: true
    },
    curse_id: {
        type: Number,
        require: true
    }
})

const Favorites = mongoose.model('UsersFavorites', usersFavorites);
module.exports = Favorites
