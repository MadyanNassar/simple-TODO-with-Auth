const Todo = require("../../models/TodoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function getTodos(req, res) {
  try {
    const secret = process.env.SECRET;
    const payload = jwt.verify(req.cookies.token, secret);
    console.log("payload");

    const todos = await Todo.where({
      user: new mongoose.Types.ObjectId(payload.id),
    }).find({ Todo });
    res.status(200).json(todos);
  } catch (err) {
    res
      .status(401)
      .json({ errMessage: "UnAuthorized .. login please", error: err });
  }
}

module.exports = getTodos;
