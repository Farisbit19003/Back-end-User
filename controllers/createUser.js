const fs = require("fs");
const dataFilePath = "./userData.json";
const createUser = (id, name, email) => {
  let users = [];
  if (!id || isNaN(id)) {
    throw ("Invalid input: ID must be a numeric value.");
  }

  if (!name || typeof name !== "string") {
    throw ("Invalid input: Name must be a non-empty string.");
  }

  if (!email) {
    throw ("Invalid input: Email must not be empty.");
  }
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    users = JSON.parse(data);
  } catch (err) {
    console.log("File doesn't exist or empty");
  }
  users.push({ id, name, email });

  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf-8");
  return "User Created Successfully";
};

module.exports = createUser;
