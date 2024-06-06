const express = require('express');
const Todo = require('../models/todo-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = new Todo({ title, completed });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }

    todo.completed = completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }

    await todo.remove();
    res.status(200).send('Todo deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;