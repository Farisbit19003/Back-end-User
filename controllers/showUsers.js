const fs = require("fs");

const dataFilePath = "./userdata.json";
const showUsers = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    const users = JSON.parse(data, null, 2);
    return users;
  } catch (err) {
    throw new Error("Error: Unable to read user data from the file.");
  }
};

module.exports = showUsers;
