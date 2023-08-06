import mongoose from "mongoose";
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
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    systemRoles: [
      {
        role: {
          type: String,
          enum: ["DOCTOR", "CLINICAL STAFF","ADMIN"],
          required: true,
        },
        department: {
          type: String,
          enum: ["Psychology", "Emergency Medicine", "Radiology", "Neurology"],
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
