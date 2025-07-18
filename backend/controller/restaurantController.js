const resturant = require('../models/Restaurant');
// const jwt = require('jsonwebtoken');
// const  {isAuthenticated} = require('../middlewares/auth');
const User = require('../models/User');

const createRestaurant = async (req, res) => {
    try {

        // checking the existence of the user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // checking if the user is a vendor
        if (user.role !== 'vendor') {
            return res.status(403).json({ message: "Access denied. Only vendors can create restaurants." });
        }

        // Extract restaurant details from request body


        const { name, description, address, location, categories, openingHours,gsti,phone } = req.body;
        const image = req.file ? req.file.path : null;

        // Validate required fields
        if (!name || !address  || !location || !categories || !openingHours) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        // Create new restaurant
        const restaurant = await resturant.create({
             name,
             description,
             address,
             image,
             location,
             categories,
             openingHours,
             gsti,
             phone,
             owner: req.user._id // ✅ This is mandatory
        });

        await User.findByIdAndUpdate(req.user._id, { restaurantRegistered: true });

        res.status(201).json({ message: "Restaurant created successfully", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getAllRestaurants = async (req,res)=>{

    try{

        const restaurants = await resturant.find().populate('products');

        res.status(200).json({ message: "Restaurants fetched successfully", restaurants });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRestaurnatById = async (req,res)=>{

    try{

        const { id } = req.params;
        const restaurant  = await resturant.findById(id).populate('products');
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant fetched successfully", restaurant });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, address, image, location, categories, openingHours } = req.body;

        // Validate required fields
        if (!name || !address || !image || !location || !categories || !openingHours) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        // Update restaurant
        const restaurant = await resturant.findByIdAndUpdate(id, {
            name,
            description,
            address,
            image,
            location,
            categories,
            openingHours
        }, { new: true });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant updated successfully", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete restaurant
        const restaurant = await resturant.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// get nearby restaurants

// controller/restaurantController.js

const getNearbyRestaurants = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and Longitude required" });
  }

  try {
    const nearbyRestaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 20000, // 20 km in meters
        },
      },
    });

    res.status(200).json(nearbyRestaurants);
  } catch (err) {
    console.error("Geo Query Error:", err);
    res.status(500).json({ message: "Failed to fetch nearby restaurants" });
  }
};


module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurnatById,
    updateRestaurant,
    deleteRestaurant,
    getNearbyRestaurants
};