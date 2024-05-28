import React, { useState } from 'react';
import SignIn from './sign-in';
import SignUp from './sign-up';

function Home() {
  const [isNewUser, setIsNewUser] = useState(true);

  return (
    <div className="home-container">
      <h1>Welcome to Todo App!</h1>
      <p>Are you a new user?</p>
      <button onClick={() => setIsNewUser(true)}>Yes, sign up!</button>
      <button onClick={() => setIsNewUser(false)}>No, sign in!</button>
      {isNewUser ? <SignUp /> : <SignIn />}
    </div>
  );
}

export default Home;