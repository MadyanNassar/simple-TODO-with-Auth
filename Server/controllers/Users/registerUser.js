const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ password: hashedPassword, email });
    const secret = process.env.SECRET;

    await user.save().then((userInfo) => {
      jwt.sign(
        { id: userInfo._id, email: userInfo.email },
        secret,
        (err, token) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: "Error Registering", error: err });
          } else {
            res
              .cookie("token", token)
              .json({ id: userInfo._id, email: userInfo.email });
          }
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
}

module.exports = registerUser;
