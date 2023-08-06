import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser, 
  logoutUser, 
} from "../controllers/users.controller";

const router = Router();

// Create a new user
router.post("/users", createUser);

// User login route
router.post("/login", loginUser);

// User logout route
router.post("/logout", logoutUser);

// Get all user
router.get("/users", getAllUsers);

// Get a single user by ID
router.get("/user/:id", getUserById);

export default router;
