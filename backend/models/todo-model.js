const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

TodoSchema.index({ title: 'text' });
TodoSchema.index({ user: 1 });
TodoSchema.index({ completed: -1 });

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;