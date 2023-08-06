import jwt from "jsonwebtoken";
import User from "../schemas/user.schema";
import { generateJwtSecret } from "../middleware/jwt.middleware";

export const authorizeUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token not provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, generateJwtSecret());

    // Find the user in the database based on the decoded token
    const user = await User.findById(decoded._id);
    if (!user || user.isLoggedOut) {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    // Move to the next middleware/route
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." });
  }
};
