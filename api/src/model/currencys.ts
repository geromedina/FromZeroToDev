import mongoose from "mongoose";
import { Schema } from "mongoose";


const currencysSchema = new Schema({
    name: {
        type: String,
        require: true
    }
})


const Currency = mongoose.model('Currency', currencysSchema);
module.exports = Currency