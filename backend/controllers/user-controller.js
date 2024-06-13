const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const createAccessToken = require('../routes/create-access-token');
const NotFoundError = require('../errors/not-found');
const CustomError = require('../errors/custom-error');

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      hashedPassword, 
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new NotFoundError('Invalid email or password');
      }
      const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);
      if (!isPasswordValid) {
        throw new CustomError('Invalid email or password', 400);
      }
      const token = createAccessToken(user._id);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      next(error);
    }
  };
  
const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-hashedPassword');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};