
const express = require("express");

const updateUser = require("../controllers/updateUser.controller");
const showUsers = require("../controllers/showUsers.controller");
const createUser = require("../controllers/createUser.controller");
const { createUserMiddleware } = require("../middleware/createuser.middleware");

const router = express.Router();

router.post("/users", createUser, createUserMiddleware); 

router.put("/users/:id" ,updateUser);

router.get("/users",showUsers);

module.exports = router;
