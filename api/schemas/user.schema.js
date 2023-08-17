import mongoose from "mongoose";
import { generateJwtSecret } from "../middleware/jwt.middleware";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    jwtSecret: {
      type: String,
      required: true,
      default: generateJwtSecret(),
    },
    isLoggedOut: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
    },
    systemRoles: [
      {
        role: {
          type: String,
          enum: ["DOCTOR", "CLINICAL STAFF", "ADMIN"],
          required: true,
        },
        department: {
          type: String,
          enum: [
            "Psychology",
            "Surgery",
            "Emergency Medicine",
            "Radiology",
            "Neurology",
            "ADMIN",
          ],
          required: true,
        },
        shifts: {
          type: String,
          enum: ["Morning", "Evening"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
