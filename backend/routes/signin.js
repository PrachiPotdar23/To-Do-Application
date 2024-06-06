const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    res.status(200).send('Signed in successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;