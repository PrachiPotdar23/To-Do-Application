import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../api';
import '../App.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signIn(email, password);
      
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', true);
        navigate('/todos');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('An error occurred while signing in');
    }
  };

  return (
    <div className="bg-screen"> 
      <div className="container">
        <div className="form-container">
          <h1 className="heading">Sign In</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="submit" onClick={handleSubmit} className="submit-button">
              Sign In
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <Link to="/signup" className="text-pink-500">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
