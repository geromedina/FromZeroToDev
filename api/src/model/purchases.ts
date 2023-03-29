import mongoose from "mongoose";
import { Schema } from "mongoose";

const purchasesSchema = new Schema  ({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        require: true
    },
    price: {
         type: Number, 
         required: true,
         min: 0,
         max: 1000 
        },
    discount: {
        type: Number, 
        required: true,
        min: 0,
        max: 1000,
    },
    total: {
        type: Number, 
        required: true,
        min: 0,
        max: 1000,
        require: true
    },
    currency_id: {
        type: Number,
        require: true
    },
    pay_method_id: {
        type: Number,
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

const Purchases = mongoose.model('Purchases', purchasesSchema);
module.exports = Purchases
