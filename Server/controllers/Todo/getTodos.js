const Todo = require("../../models/TodoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function getTodos(req, res) {
  try {
    const secret = process.env.SECRET;
    const payload = jwt.verify(req.cookies.token, secret);
    console.log("payload");

    Todo.where({ user: new mongoose.Types.ObjectId(payload.id) }).find(
      (err, Todo) => {
        res.status(200).json(Todo);
      }
    );
  } catch (err) {
    res.status(400).json({ message: "Bad Request", error: err });
  }
}

module.exports = getTodos;
