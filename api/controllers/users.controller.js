
import User from "../../schemas/user.schema";


// Controller for creating a new doctor
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Could not create the user." });
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
