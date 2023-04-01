import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IAdmin } from "../utils/types";

const adminSchema = new Schema({
    admin_id:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    admname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    create_at:{
        type: Date,
        required: true
    },
    update_at: {
        type: Date,
        required: true
    }
})

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);