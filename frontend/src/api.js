import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const signIn = (email, password) => api.post('/signin', { email, password });
export const signUp = (firstName, lastName, email, password) => api.post('/signup', { firstName, lastName, email, password });
export const createTodo = (title) => api.post('/todos', { title });
export const getTodos = () => api.get('/todos');
export const updateTodo = (id, completed) => api.put(`/todos/${id}`, { completed });
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export default api;
