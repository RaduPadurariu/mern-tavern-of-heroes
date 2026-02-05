import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    default: null,
  },
  heroClass: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: null,
  },
});

export default mongoose.model("User", userSchema);
