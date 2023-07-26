const createUser = require("../controllers/createUser.controller");

const createUserMiddleware = (req, res, next) => {
  try {
    const { id, name, email, gender, phoneNo, isAdmin, doB, cNIC } = req.body;
    const dateOfBirth = new Date(doB);
    createUser(id, name, email, gender, phoneNo, isAdmin, dateOfBirth, cNIC);
    res.send("User Created Successfully");
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

module.exports = {
  createUserMiddleware,
};
