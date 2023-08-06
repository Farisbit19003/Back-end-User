import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("🚀...BOOM ...!DATABASE CONNECTED");
  })
  .catch(() => {
    console.log("DB CONNECTION ERROR 😢...");
  });

app.use(express.json());

// Dynamically load all route files using fs and map
fs.readdirSync("./api/routes").map((r) => {
  if (r.endsWith(".js")) {
    const route = require(`./api/routes/${r}`);
    app.use("/api", route.default);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
