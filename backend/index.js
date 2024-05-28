require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth-routes');
const todoRoutes = require('./routes/todo-routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001', credentials: true, }));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Create Mongoose models
    const User = require('./models/user-model');
    const Todo = require('./models/todo-model');

    // Create indexes for Mongoose models
    User.createIndexes();
    Todo.createIndexes();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });