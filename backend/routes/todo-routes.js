const express = require('express');
const router = express.Router();
const Todo = require('../models/todo-model');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single todo by ID
router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo);
});

// Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a todo by ID
router.patch('/:id', getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }

  if (req.body.description != null) {
    res.todo.description = req.body.description;
  }

  if (req.body.completed != null) {
    res.todo.completed = req.body.completed;
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo by ID
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a todo by ID
async function getTodo(req, res, next) {
  let todo;

  try {
    todo = await Todo.findById(req.params.id);

    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.todo = todo;
  next();
}

module.exports = router;