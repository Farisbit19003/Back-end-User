import { Router } from "express";
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
} from "../controllers/doctors.controller.js";

const router = Router();

// Create a new doctor
router.post("/doctors", createDoctor);

// Get all doctors
router.get("/doctors", getAllDoctors);

// Get a single doctor by ID
router.get("/doctors/:id", getDoctorById);

export default router;
