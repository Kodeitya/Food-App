
const express = require('express');

const {register, login} = require('../controller/userController');

const { googleLogin } = require('../controller/googleController');

const router =  express.Router();

// Google login route
router.post('/google-login', googleLogin);

// Register route

router.post('/register', register);

// Login route

router.post('/login', login);

// Export the router

module.exports = router;