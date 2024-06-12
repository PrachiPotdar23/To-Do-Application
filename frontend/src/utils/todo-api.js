import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos'; // Adjust the base URL as needed

const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const createTodo = async (todo) => {
  const token = getToken();
  const response = await axios.post(API_URL, todo, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const getTodos = async () => {
  const token = getToken();
  const response = await axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteTodo = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};


export const searchTodos = async (searchTerm, status) => {
  console.log(searchTerm);
  console.log(status);
  const token = getToken();
  try {
    const response = await axios.get(`${API_URL}/search-todos`, {
      params: { searchTerm, status },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("search", response);
    return response.data;
  } catch (error) {
    console.error('Error searching todos:', error);
    throw error;
  }
};

export const updateTodoStatus = async (id, status) => {
  console.log(status);
  const todoId=id.toString();
  const token = getToken();
  try {
    const response = await axios.patch(`${API_URL}/${todoId}/status`, { status }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
      
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};