
const express = require('express');

const {register, login} = require('../controller/userController');

const router =  express.Router();

// Register route

router.post('/register', register);

// Login route

router.post('/login', login);

// Export the router

module.exports = router;