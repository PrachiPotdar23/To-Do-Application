import React, { useState, useEffect } from 'react';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../api';
import '../App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const handleCreateTodo = async (event) => {
    event.preventDefault();
    const response = await createTodo(newTodo);
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const handleUpdateTodo = async (id, completed) => {
    const response = await updateTodo(id, completed);
    setTodos(todos.map(todo => todo._id === id ? response.data : todo));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="container">
      <div className="todo-list-container">
        <h1 className="heading">Todo List</h1>
        <form onSubmit={handleCreateTodo}>
          <input
            type="text"
            placeholder="Add a new todo"
            className="todo-input"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            required
          />
          <button type="submit" className="todo-submit-button">
            Add Todo
          </button>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo._id} className="todo-item">
              <span>{todo.title}</span>
              <button
                className={`complete-button ${todo.completed ? 'bg-green-300' : 'bg-green-500'}`}
                onClick={() => handleUpdateTodo(todo._id, !todo.completed)}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
