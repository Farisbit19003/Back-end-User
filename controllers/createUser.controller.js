const fs = require("fs");
const dataFilePath = "./userData.json";

const createUser = (id, name, email, gender, phoneNo, isAdmin, doB, cNIC) => {
  let users = [];

  if (!id || isNaN(id)) {
    throw new Error("Invalid input: ID must be a numeric value.");
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Invalid input: Name must be a non-empty string.");
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    throw new Error("Invalid input: Email must be a non-empty string.");
  }

  if (!gender || typeof gender !== "string" || !["male", "female"].includes(gender.toLowerCase())) {
    throw new Error("Invalid input: Gender must be one of 'male', 'female'.");
  }

  if (!phoneNo || isNaN(phoneNo) || phoneNo.toString().length < 10) {
    throw new Error("Invalid input: Phone number must be a valid 10-digit number.");
  }

  if (typeof isAdmin !== "boolean") {
    throw new Error("Invalid input: isAdmin must be a boolean value.");
  }
  const inputDate = new Date(doB);

  if (!inputDate || !(inputDate instanceof Date) || isNaN(inputDate.getTime())) {
    throw new Error("Invalid input: Date of Birth (doB) must be a valid Date object.");
  }

  if (!cNIC || cNIC.length !== 13 ) {
    throw new Error("Invalid input: CNIC must be a 13-digit numeric string.");
  }

  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users = JSON.parse(data);
    users.push({ id, name, email, gender, phoneNo, isAdmin, doB, cNIC });
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf-8");
    // return the success message instead of sending it directly
    return "User Created Successfully";
  } catch (err) {
    // Throw an error instead of sending a response here
    throw new Error("An error occurred while creating the user.");
  }
};

module.exports = createUser;
