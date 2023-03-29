import mongoose from "mongoose";
import { Schema } from "mongoose";

const payMethodSchema = new Schema({
    name: {
        type: String,
        require: true
    }
})

const PayMethod = mongoose.model('Paymethod', payMethodSchema);
module.exports = PayMethod