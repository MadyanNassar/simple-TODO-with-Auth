const Todo = require("../../models/TodoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function createTodo(req, res) {
  console.log(req.body);
  try {
    const secret = process.env.SECRET;
    const payload = jwt.verify(req.cookies.token, secret);

    const todo = new Todo({
      text: req.body.text,
      done: false,
      important: false,
      user: new mongoose.Types.ObjectId(payload.id),
    });
    console.log(todo);

    await todo.save().then((todo) => {
      res.status(201).json(todo);
    });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "something went wrong ... Can't create todo",
        error: err,
      });
  }
}

module.exports = createTodo;
