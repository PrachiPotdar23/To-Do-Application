import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.signIn(email, password);
      if (response.ok) {
        navigate('/api/todos', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="primary">Sign In</Button>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;