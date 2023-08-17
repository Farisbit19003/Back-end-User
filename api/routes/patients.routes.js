import { Router } from "express";
import {
  createPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatientById,
} from "../controllers/patients.controller";

const patientRouter = Router();

// Create a new patient
patientRouter.post("/patients", createPatient);

// Get all patients
patientRouter.get("/patients", getAllPatients);

// Get a single patient by ID
patientRouter.get("/patients/:id", getPatientById);

// Update a single patient
patientRouter.put("/patients/:id", updatePatientById);

// Delete a single patient
patientRouter.delete("/patients/:id", deletePatientById);

export default patientRouter;
