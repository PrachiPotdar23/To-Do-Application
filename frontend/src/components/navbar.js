import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const NavigationBar = ({handleSignOut }) => {
  const navigate = useNavigate();

  const handleSignOutClick = async () => {
    await handleSignOut();
    navigate('/signin'); 
  };

  return (
    <nav className="navbar">
      
       
          <div className="nav-link">
            <button onClick={handleSignOutClick} className="nav-button ">Sign Out</button>
          </div>
       
      
    </nav>
  );
};

export default NavigationBar;
