const User = require("../../models/UserModel");

async function logOutUser(req, res) {
  try {
    res.cookie("token", "").send();
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = logOutUser;
