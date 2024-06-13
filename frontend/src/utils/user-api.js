import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/users'; 

export const signIn = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    const { token } = response.data;
    
    console.log("signin token",token);
    localStorage.setItem('token', response.data.token);
    return response;
  } catch (error) {
    console.error('Error during sign in API call:', error.response?.data || error);
    return { status: 400, data: { message: 'Invalid email or password' } };
  }
};

export const signUp = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, { firstName, lastName, email, password });
      return response;
    } catch (error) {
      console.error('Error during sign up API call:', error.response?.data || error); 
      throw error;
    }
  };
  