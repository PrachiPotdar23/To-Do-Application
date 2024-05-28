import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      // Handle error response from backend
      console.error(error.response.data);
    } else {
      // Handle network error
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;