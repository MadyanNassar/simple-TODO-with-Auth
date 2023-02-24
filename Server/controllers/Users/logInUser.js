const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function logInUser(req, res) {
  try {
    const { email, password } = req.body;
    const secret = process.env.SECRET;

    await User.findOne({ email }).then((userInfo) => {
      if (!userInfo) {
        return res.status(401).json({ message: "not found user", error: err });
      }
      const passOk = bcrypt.compareSync(password, userInfo.password);
      if (passOk) {
        jwt.sign({ id: userInfo._id, email }, secret, (err, token) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: "Bad Request", error: err });
          } else {
            res
              .cookie("token", token)
              .status(200)
              .json({ id: userInfo._id, email: userInfo.email });
          }
        });
      } else {
        res.status(400).json({ message: "Bad Request", error: err });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "login error", error: err });
  }
}

module.exports = logInUser;
