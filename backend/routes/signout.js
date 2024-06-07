
const express = require('express');
const errorHandler = require('./error');
const router = express.Router();

router.post('/signout', (req, res) => {
  
  req.session = null; 
  res.clearCookie('token'); 
  res.status(200).send({ message: 'Signed out successfully' });
});
router.use(errorHandler); 
module.exports = router;
