import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, toggleTodo, deleteTodo } from './actions'; // Import from actions.js
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    dispatch(getTodos(userId));
  }, [userId, dispatch]);

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <Card key={todo.id} className="todo-item">
          <CardBody>
            <CardTitle tag="h5">{todo.title}</CardTitle>
            <CardText>{todo.description}</CardText>
            <div className="todo-actions">
              <Button
                color={todo.completed ? 'success' : 'primary'}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </Button>
              <Button color="danger" onClick={() => handleDelete(todo.id)}>
                Delete
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default TodoList;