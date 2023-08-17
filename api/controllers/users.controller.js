import { generateJwtSecret } from "../middleware/jwt.middleware";
import { hashPassword } from "../middleware/password.middleware";
import User from "../schemas/user.schema";

// Controller for creating a new user
export const createUser = async (req, res) => {
  try {
    const jwtSecret = generateJwtSecret(); // Generate a random JWT secret key

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      jwtSecret, // Store the JWT secret key in the user record
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Could not create the user." });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Update the user's JWT secret to null and set the logout status
    const user = await User.findByIdAndUpdate(
      userId,
      { jwtSecret: null, isLoggedOut: true },
      { new: true }
    );

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ error: "Could not log out." });
  }
};


// Controller for retrieving all doctors
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve users." });
  }
};

// Controller for retrieving a single doctor by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve the User." });
  }
};

//Controller for Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user does not exist or is logged out, return an error
    if (!user || user.isLoggedOut) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a new JWT secret for the user
    const jwtSecret = generateJwtSecret();

    // Create the JWT token
    const token = jwt.sign({ _id: user._id }, jwtSecret);

    // Update the user's jwtSecret with the new value
    user.jwtSecret = jwtSecret;
    await user.save();

    // Send the token in the response
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Failed to log in." });
  }
};


// Controller for updating a user by ID
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Could not update the user." });
  }
};


// Controller for deleting a user by ID
export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete the user." });
  }
};

