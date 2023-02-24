const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

async function getUser(req, res) {
  try {
    const secret = process.env.SECRET;
    if (!req.cookies.token) {
      return res.json({ message: "no login user" });
    }
    const payload = jwt.verify(req.cookies.token, secret);

    await User.findById(payload.id).then((userInfo) => {
      if (!userInfo) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json({ id: userInfo._id, email: userInfo.email });
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = getUser;
