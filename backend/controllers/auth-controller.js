const User = require('../models/user-model');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword });

    await newUser.save();

    // Generate a JWT token and return it
    const token = newUser.generateAuthToken();
    res.status(201).json({ message: 'Sign-up successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If the user is valid, generate a JWT token and return it
    const token = user.generateAuthToken();
    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, signin };