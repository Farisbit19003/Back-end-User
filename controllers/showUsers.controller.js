const fs = require("fs");

const dataFilePath = "./userdata.json";
const showUsers = (req, res, next) => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    const users = JSON.parse(data, null, 2);
    res.render("users", { users }); 
  } catch (err) {
    next(err);
  }
};

module.exports = showUsers;
