const express = require("express");
const createTodo = require("../controllers/Todo/createTodo");
const getTodos = require("../controllers/Todo/getTodos");
const updateTodo = require("../controllers/Todo/updateTodo");
const deleteTodo = require("../controllers/Todo/deleteTodo");

const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
