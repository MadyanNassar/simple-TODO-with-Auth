const Todo = require("../../models/TodoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function createTodo(req, res) {
  try {
    const secret = process.env.SECRET;
    const payload = jwt.verify(req.cookies.token, secret);
    console.log(payload);

    const todo = new Todo({
      text: req.body.text,
      done: false,
      user: new mongoose.Types.ObjectId(payload.id),
    });
    await todo.save().then((todo) => {
      res.status(201).json(todo);
    });
  } catch (err) {
    res.status(400).json({ message: "Can't create todo", error: err });
  }
}

module.exports = createTodo;
