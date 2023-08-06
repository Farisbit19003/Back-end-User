import { Router } from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
} from "../controllers/patients.controller";

const router = Router();

// Create a new patient
router.post("/patients", createPatient);

// Get all patients
router.get("/patients", getAllPatients);

// Get a single patient by ID
router.get("/patients/:id", getPatientById);

export default router;
