import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api'; 
import NavigationBar from './navbar'; 
import '../App.css';
import { useNavigate } from 'react-router-dom'; 

const TodoList = () => {
  const navigate = useNavigate(); 
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState('');
  const [setIsAuthenticated] = useState(false); 

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos');
    }
  };

  const handleCreateTodo = async (event) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setError('Todo title cannot be empty');
      return;
    }

    try {
      const todo = await createTodo({
        title: newTodo.trim(),
        completed: false
      });
      setTodos(prevTodos => [...prevTodos, todo]);
      setNewTodo('');
      setError(null);
    } catch (error) {
      console.error('Error creating todo:', error);
      setError('Failed to create todo');
    }
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    if (!todo) return;

    try {
      const updatedTodo = await updateTodo(id, { completed: !todo.completed });
      setTodos(prevTodos => prevTodos.map(t => (t._id === id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo');
    }
  };

  const handleEditTodo = (id, title) => {
    setEditingTodoId(id);
    setEditedTodoTitle(title);
  };

  const handleSaveEditedTodo = async (id) => {
    try {
      console.log('Editing todo with ID:', id);
      console.log('Edited todo title:', editedTodoTitle);

      const updatedTodo = await updateTodo(id, { title: editedTodoTitle });
      console.log('Updated todo:', updatedTodo);

      const updatedTodos = todos.map(todo => (todo._id === id ? updatedTodo : todo));
      console.log('Updated todos:', updatedTodos);

      setTodos(updatedTodos);
      setEditingTodoId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo');
    }
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out');
    }
  };

  return (
    <div>
      <NavigationBar handleSignOut={handleSignOut} />

      <div className="todo-list-container">
        <h1 className='heading'>TodoList</h1>
        <form onSubmit={handleCreateTodo}>
          <input
            id="newTodo"
            name="newTodo"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            className="todo-input"
          />
          <button type="submit" className="submit-button">Add Todo</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {todos.map((todo, index) => (
            <li key={todo._id} className="todo-item">
              {editingTodoId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editedTodoTitle}
                    onChange={(e) => setEditedTodoTitle(e.target.value)}
                  />
                  <button onClick={() => handleSaveEditedTodo(todo._id)} className="edit-button">Save</button>
                </>
              ) : (
                <>
                  <span>{index + 1}. {todo.title} - {todo.completed ? 'Completed' : 'Incomplete'}</span>
                  <button onClick={() => handleToggleComplete(todo._id)} className="complete-button">
                    {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </button>
                  <button onClick={() => handleEditTodo(todo._id, todo.title)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteTodo(todo._id)} className="delete-button">Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
