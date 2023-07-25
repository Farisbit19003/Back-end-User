
const express = require("express");

const updateUser = require("../controllers/updateUser");
const showUsers = require("../controllers/showUsers");
const createUser = require("../controllers/createUser");

const router = express.Router();

router.post("/users", (req, res) => {
  const { id, name, email } = req.body;
  const result = createUser(id ,name, email)
  res.send(result);
});

router.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  try {
    const result = updateUser(userId, name, email);
    res.send(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/users", (req, res ,next) => {
  try {
    const users = showUsers();
    res.render("users",{users});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
