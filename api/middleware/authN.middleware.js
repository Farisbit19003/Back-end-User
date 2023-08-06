import jwt from "jsonwebtoken";
import User from "../schemas/user.schema";

const secretKey = "yourSecretKey"; // Replace this with your own secret key

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token not provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);

    // Find the user in the database based on the decoded token
    User.findById(decoded._id, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Failed to authenticate." });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Attach the authenticated user to the request object
      req.user = user;

      // Move to the next middleware/route
      next();
    });
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." });
  }
};
