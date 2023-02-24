const Todo = require("../../models/TodoModel");

async function updateTodo(req, res) {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).send(`todo was deleted from the database`);
  } catch (err) {
    res.status(404).json({ message: "Bad Request", error: err });
  }
}

module.exports = updateTodo;
