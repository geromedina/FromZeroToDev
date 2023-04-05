import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  country: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  favorites: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
    required: false
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
