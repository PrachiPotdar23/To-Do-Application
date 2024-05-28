import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/nav-bar';
import Home from './components/home';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import TodoList from './components/todo-list';

function App({ api }) {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/signin" element={<SignIn />} />
        <Route path="api/signup" element={<SignUp />} />
        <Route path="api/todos" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;