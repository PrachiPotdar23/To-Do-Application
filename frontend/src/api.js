import axios from 'axios';

export const signUp = (firstName, lastName, email, password) => {
  return axios.post('http://localhost:3000/api/signup', {
    firstName,
    lastName,
    email,
    password,
  });
};

export const signIn = (email, password) => {
  return axios.post('http://localhost:3000/api/signin', {
    email,
    password,
  });
};

export const signOut = () => {
  localStorage.removeItem('authToken');
  return Promise.resolve();
};

export const getTodos = async () => {
  const response = await axios.get('http://localhost:3000/api/todos');
  return response.data;
};

export const createTodo = async ({ title, completed }) => {
  const response = await axios.post('http://localhost:3000/api/todos', { title, completed });
  return response.data;
};

export const updateTodo = async (title, updatedTodo) => {
  const response = await axios.put(`http://localhost:3000/api/todos/${encodeURIComponent(title)}`, updatedTodo);
  return response.data;
};


export const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3000/api/todos/${id}`);
};
