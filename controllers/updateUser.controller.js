const fs = require("fs");
const dataFilePath = "./userData.json";

const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, gender, phoneNo, isAdmin, doB, cNIC } = req.body;

  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users = JSON.parse(data);
    const userToUpdate = users.find((user) => user.id.toString() === userId);

    if (!userToUpdate) {
      return res.status(404).send("Error! User not Found...!");
    }

    userToUpdate.name = name;
    userToUpdate.email = email;
    userToUpdate.phoneNo = phoneNo;
    userToUpdate.gender = gender;
    userToUpdate.doB = doB;
    userToUpdate.cNIC = cNIC;
    userToUpdate.isAdmin = isAdmin;

    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf-8");
    res.send("User is updated successfully");
  } catch (err) {
    res.status(500).send("An error occurred while updating the user.");
  }
};

module.exports = updateUser;
