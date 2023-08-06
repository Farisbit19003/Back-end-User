import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users.controller";

const router = Router();

// Create a new doctor
router.post("/users", createUser);

// Get all doctors
router.get("/users", getAllUsers);

// Get a single doctor by ID
router.get("/user/:id", getUserById);

export default router;
