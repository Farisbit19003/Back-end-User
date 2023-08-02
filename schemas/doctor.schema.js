import mongoose from "mongoose";
const { Schema } = mongoose;

const docSchema = new Schema(
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
          enum: ["DOCTOR", "SURGEON", "CLINICAL STAFF","PSYCHATRIST"],
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

const Doctor = mongoose.model("Doctor", docSchema);
export default Doctor;
