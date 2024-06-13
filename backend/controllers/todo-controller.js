//todo-controller.js
const Todo = require('../models/todo-model');
const { TODO_STATUS } = require('../utils/constants');
const CustomError = require('../errors/custom-error');
const NotFoundError = require('../errors/not-found');

const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.userId) {
      throw new NotFoundError('Todo not found');
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { title, description, type, status, dueDate } = req.body;
    const newTodo = new Todo({
      user: req.userId,
      title,
      description,
      type,
      status,
      dueDate,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { title, description, type, status, dueDate, active } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.userId) {
      throw new NotFoundError('Todo not found');
    }
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.type = type || todo.type;
    todo.status = status || todo.status;
    todo.dueDate = dueDate || todo.dueDate;
    todo.active = active !== undefined ? active : todo.active;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.userId) {
      throw new NotFoundError('Todo not found');
    }
    await todo.remove();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const updateTodoStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.userId) {
      throw new NotFoundError('Todo not found');
    }
    if (!Object.values(TODO_STATUS).includes(status)) {
      throw new CustomError('Invalid status', 400);
    }
    todo.status = status;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const searchTodos = async (req, res, next) => {
  try {
    const { term } = req.query;
    const todos = await Todo.find({
      user: req.userId,
      $or: [
        { title: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } }
      ]
    });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
  searchTodos,
};