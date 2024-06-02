// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/sign-up';
import SignIn from './components/sign-in';
import TodoList from './components/todo-list';
import './App.css'; // Import your global CSS file

function App() {
  return (
    <Router>
      <div className="bg-screen"> {/* Set background image */}
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
