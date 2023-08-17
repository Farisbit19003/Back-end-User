import { Router } from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} from "../controllers/appointments.controller";

const appointmentRouter = Router();

// Create a new appointment
appointmentRouter.post("/appointments", createAppointment);

// Get all appointments
appointmentRouter.get("/appointments", getAllAppointments);

// Get a single appointment by ID
appointmentRouter.get("/appointments/:id", getAppointmentById);

// Update an appointment by ID
appointmentRouter.put("/appointments/:id", updateAppointmentById);

// Delete an appointment by ID
appointmentRouter.delete("/appointments/:id", deleteAppointmentById);

export default appointmentRouter;
