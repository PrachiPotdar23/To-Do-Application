// NavigationBar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const NavigationBar = ({ handleSignOut }) => {
  const navigate = useNavigate();
  
  const handleSignOutClick = async () => {
    await handleSignOut;
    navigate('/signin'); 
  };

  const handleAddTodoClick = () => {
    navigate('/todos');
  };

  return (
    <nav className="navbar">
      <div className="nav-link">
        <button onClick={() => navigate('/home')} className="nav-button">Home</button>
      </div>
      <div className="nav-link">
        <button onClick={handleAddTodoClick} className="nav-button">Add Todo</button>
      </div>
      <div className="nav-link">
        <button onClick={handleSignOutClick} className="nav-button">Sign Out</button>
      </div>
    </nav>
  );
};

export default NavigationBar;
