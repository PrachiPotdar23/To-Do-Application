const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const errorHandler = require('./error'); 
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    next(error); 
  }
});


router.use(errorHandler);

module.exports = router;