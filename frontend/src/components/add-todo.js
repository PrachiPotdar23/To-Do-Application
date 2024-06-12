import React, { useState } from 'react';
import { createTodo } from '../utils/todo-api';
import '../App.css';

function AddTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState(''); // Add status state

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createTodo({ title, description, dueDate, type, status });
      alert("Todo Added Succesfully!");
    } catch (error) {
      console.error('Error adding todo:', error);
     
    }
  };

  return (
    <div className="form-container">
      <h1 className="heading">Add Todo</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Title"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Due Date"
          className="input-field"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select
          className="input-field"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="PERSONAL">Personal</option>
          <option value="WORK">Work</option>
          <option value="HOBBY">Hobby</option>
        </select>
        <select
          className="input-field"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="TODO">To do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <button type="submit" className="submit-button">Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodo;
