const Todo = require("../../models/TodoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function deleteTodo(req, res) {
  try {
    const secret = process.env.SECRET;
    const payload = jwt.verify(req.cookies.token, secret);

    const todo = await Todo.findOneAndRemove({
      _id: new mongoose.Types.ObjectId(req.params.id),
      user: new mongoose.Types.ObjectId(payload.id),
    });

    res.status(200).send(`todo was deleted from the database`);
  } catch (err) {
    res.status(404).json({ message: "Bad Request", error: err });
  }
}

module.exports = deleteTodo;
