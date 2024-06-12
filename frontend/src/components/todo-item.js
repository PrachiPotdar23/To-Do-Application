import React from 'react';

function TodoItem({ todo }) {
  const { title, description, dueDate, type, status } = todo;

  
  const typeOptions = {
    personal: 'Personal',
    work: 'Work',
    hobby: 'Hobby'
  };

  const statusOptions = {
    all: 'All',
    inprogress: 'In Progress',
    completed: 'Completed',
    archive: 'Archive'
  };

  return (
    <div className="todo-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {typeOptions[type]}</p> 
      <p><strong>Status:</strong> {statusOptions[status]}</p> 
    </div>
  );
}

export default TodoItem;
