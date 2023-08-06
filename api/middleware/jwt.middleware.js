import crypto from "crypto";

export const generateJwtSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};
