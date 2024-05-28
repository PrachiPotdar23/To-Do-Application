const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;

exports.signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

exports.signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    req.session.userId = user._id;
    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.checkAuthStatus = (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
};