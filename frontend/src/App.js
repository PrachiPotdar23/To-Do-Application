import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/sign-up';
import SignIn from './components/sign-in';
import TodoList from './components/todo-list';
import Home from './components/home';
import './App.css'; 
import { useNavigate } from 'react-router-dom'; 
function App() {
  const [setIsAuthenticated] = useState(false); 
  return (
    <Router>
      <div className="bg-screen"> 
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/home" element={<HomeWrapper setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomeWrapper({ setIsAuthenticated }) {
  const navigate = useNavigate(); 
  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return <Home handleSignOut={handleSignOut} />;
}

export default App;
