import mongoose from "mongoose";
import { Schema } from "mongoose";





const userSchema = new Schema({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  favorites: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
    required: false,
  },
  role: { 
    type: String, 
    default: 'user' 
  },
  token: { 
    type: String,
    default: null 
  },
  roles:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    }
  ],

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});



const Users = mongoose.model("Users", userSchema);
export default Users;
