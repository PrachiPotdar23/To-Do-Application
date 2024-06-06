
const express = require('express');
const router = express.Router();

router.post('/signout', (req, res) => {
  
  req.session = null; 
  res.clearCookie('token'); 
  res.status(200).send({ message: 'Signed out successfully' });
});

module.exports = router;
