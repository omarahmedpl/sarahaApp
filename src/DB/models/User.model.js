import mongoose from "mongoose";
import { Schema } from "mongoose";

export const roleTypes = {
  User: "User",
  Admin: "Admin",
};
export const genders = {
  male: "male",
  female: "female",
};
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: String,
    role: {
      type: String,
      role: Object.values(roleTypes),
      default: "User",
    },
    gender: {
      type: String,
      enum: Object.values(genders),
      default: "male",
    },
    dob: Date,
    image: String,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    changePasswordAt: Date,
    deleted : {
      type: Boolean,
      default: false
    }, 
    otp : {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("user", UserSchema);
export default User;
