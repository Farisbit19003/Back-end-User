import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  updateUserById,
} from "../controllers/users.controller";

const userRouter = Router();

// Create a new user
userRouter.post("/users", createUser);

// User login route
userRouter.post("/login", loginUser);

// User logout route
userRouter.post("/logout", logoutUser);

// Get all user
userRouter.get("/users", getAllUsers);

// Get a single user by ID
userRouter.get("/user/:id", getUserById);

// Delete a single user by ID
userRouter.delete("/users/:id", deleteUserById);

// Update a single user by ID
userRouter.put("/users/:id", updateUserById);

export default userRouter;
