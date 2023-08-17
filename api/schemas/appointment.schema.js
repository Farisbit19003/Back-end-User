import mongoose from "mongoose";
const { Schema } = mongoose;
const appointmentSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clinicalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    duration:{
      type:Number,
      required:true,
      default:20,
    },
    fee:{
      type:Number,
      required:true,
      default:2000,
    },
    notes: String,
    status: {
      type: String,
      enum: ["Scheduled", "Pending","Cancelled", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
