import axios from 'axios';

export const GET_TODOS = 'GET_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const getTodos = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/todos/${userId}`);
    dispatch({ type: GET_TODOS, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const toggleTodo = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/todos/${id}`);
    dispatch({ type: TOGGLE_TODO, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/todos/${id}`);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error(error);
  }
};