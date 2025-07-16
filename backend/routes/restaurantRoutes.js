const express = require('express');
const router = express.Router();

const {createRestaurant, getAllRestaurants,
    getRestaurnatById, updateRestaurant, deleteRestaurant,getNearbyRestaurants} = require('../controller/restaurantController');

const { isAuthenticated, restrictTo } = require('../middlewares/auth');


// Create a new restaurant
router.post('/', isAuthenticated, restrictTo("vendor"), createRestaurant);

// Get all restaurants
router.get('/', isAuthenticated, getAllRestaurants);

// Get a restaurant by ID
router.get('/:restaurantId', isAuthenticated, getRestaurnatById);

// Update a restaurant
router.put('/:restaurantId', isAuthenticated, restrictTo("vendor"), updateRestaurant);

// Delete a restaurant
router.delete('/:restaurantId', isAuthenticated, restrictTo("vendor"), deleteRestaurant);

// Get nearby restaurants
router.get('/nearby', isAuthenticated, getNearbyRestaurants);

module.exports = router;