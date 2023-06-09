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
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  courses_pay: {
    type: Array,
    defaultValue: [],
  },
  courses_sale: {
    type: Array,
    defaultValue: [],
  },
  password: {
    type: String,
    required: false,
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
    enum: ["admin", "teacher", "user"],
    default: "user",
  },
  token: {
    type: String,
    default: null,
  },
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
