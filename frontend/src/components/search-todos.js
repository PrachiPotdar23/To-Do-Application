// search-todos.js
import React, { useState, useEffect } from 'react';
import { searchTodos } from '../utils/todo-api';

const SearchResults = ({ searchTerm, filter }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await searchTodos(searchTerm, filter);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchTerm, filter]);

  return (
    <div className='todo-list-container'>
    <div className="search-results">
      {searchResults.map((todo) => (
        <div key={todo.id} className={`todo-card ${todo.status === 'COMPLETED'? 'completed' : ''}`}>
          <h2 className="title">Title: {todo.title}</h2>
          <p>Description: {todo.description}</p>
          <p className="due-date">
            <span>Due Date: </span> {new Date(todo.dueDate).toLocaleDateString()} at {new Date(todo.dueDate).toLocaleTimeString()}
          </p>
          <p>
            <span>Type: </span> {todo.type}
          </p>
          <p>
            <span>Status: </span> {todo.status}
          </p>
        </div>
      ))}
    </div>
    </div>
  );

};

export default SearchResults;