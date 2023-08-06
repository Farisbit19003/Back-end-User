import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
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
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    medicalHistory: {
      type: String,
      required: true,
    },
    allergies: {
      type: [String], // An array of strings for multiple allergies
      default: [],
    },
    bloodType: {
      type: String,
      enum: ["A-", "B-", "AB-", "O-","A+", "B+", "AB+", "O+", "Unknown"],
      default: "Unknown",
    },
    emergencyContact: {
      name: String,
      phoneNumber: String,
      relationship: String,
    },
    insuranceProvider: String,
    insuranceNumber: String,
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed", "Other"],
      default: "Single",
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
