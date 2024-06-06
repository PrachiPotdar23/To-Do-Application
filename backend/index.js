const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const signUpRoute = require('./routes/signup');
const signInRoute = require('./routes/signin');
const todosRoute = require('./routes/todos');

const app = express();

app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/api/signup', signUpRoute);
app.use('/api/signin', signInRoute);
app.use('/api/todos', todosRoute);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
