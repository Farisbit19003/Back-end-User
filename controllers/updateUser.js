const fs = require("fs");
const dataFilePath = "./userData.json";

const updateUser = (userId, name, email) => {
  let users = [];
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    users = JSON.parse(data);
  } catch (err) {
    throw new Error("Error: User data file doesn't exist or is empty");
  }

  const userToUpdate = users.find((user) => user.id.toString() === userId);

  if (!userToUpdate) {
    throw new Error("Error! User not Found...!");
  }

  userToUpdate.name = name;
  userToUpdate.email = email;

  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf-8");

  return "User is updated successfully";
};

module.exports = updateUser;
