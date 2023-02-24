const Todo = require("../../models/TodoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function updateTodo(req, res) {
  try {
    const secret = process.env.SECRET;
    const payload = jwt.verify(req.cookies.token, secret);
    const todo = await Todo.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      user: new mongoose.Types.ObjectId(payload.id),
    });
    Object.assign(todo, req.body);
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: "Bad Request", error: err });
  }
}

module.exports = updateTodo;
