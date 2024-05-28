const express = require('express');
const router = express.Router();
const { signUpUser, signInUser, checkAuthStatus } = require('../controllers/auth-controller');

router.post('/api/auth/signup', signUpUser);
router.post('/api/auth/signin', signInUser);
router.get('/api/auth/check-auth', checkAuthStatus);

module.exports = router;