
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {createProduct, getAllProducts, updateProduct, 
deleteProduct,getRestaurantProducts} = require('../controller/productController');

const { isAuthenticated, restrictTo } = require('../middlewares/auth');



// Create a new product
router.post('/', upload.single('image'),isAuthenticated, restrictTo('vendor'), createProduct);

// Get all products
router.get('/', isAuthenticated, getAllProducts);

// Get a product by ID
// router.get('/:productId', isAuthenticated, getProductById);

// Update a product
router.put('/:productId', isAuthenticated,upload.single('image'), restrictTo("vendor"), updateProduct);

// Delete a product
router.delete('/:productId', isAuthenticated, restrictTo("vendor"), deleteProduct);

// Get all products of a restaurant
router.get('/restaurant/:restaurantId', isAuthenticated, getRestaurantProducts);

module.exports=router;