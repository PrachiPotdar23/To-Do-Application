//todo-routes.js
const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
  searchTodos,
} = require('../controllers/todo-controller');
const errorMiddleware = require('../errors/error-middleware');

const router = express.Router();

router.get('/', authMiddleware, getTodos);
router.get('/:id', authMiddleware, getTodoById);
router.post('/', authMiddleware, createTodo);
router.put('/:id', authMiddleware, updateTodo);
router.patch('/:id/status', authMiddleware, updateTodoStatus);
router.delete('/:id', authMiddleware, deleteTodo);

// Add the search route
router.get('/search', authMiddleware, searchTodos);

router.use(errorMiddleware);

module.exports = router;