// Home.js

import React, { useState, useEffect } from 'react';
import { getTodos} from '../api'; 
import NavigationBar from './navbar'; 
import '../App.css';

const Home = ({ handleSignOut }) => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

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

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div>
      <NavigationBar handleSignOut={handleSignOut} />
      <div className="todo-list-container">
        <h1 className='heading'>TodoList</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos"
          className="search-input"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="todo-cards">
          {filteredTodos.map((todo, index) => (
            <div key={todo._id} className="todo-card">
              <h3>{index + 1}. {todo.title}</h3>
              <p>Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
