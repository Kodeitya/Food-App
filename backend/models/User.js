 const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },

    phone:{
        type:String,
        required:true,
        unique:true,
    },

    password:{

        type:String,
        required:true,
    },

    role: 
    { type: String, 
      enum: ['user', 'admin','vendor'], 
      default: 'user',
    },

    restaurantRegistered: {
        type: Boolean,
        default: false
    },

    isGoogleUser: {
    type: Boolean,
    default: false
    }

})


module.exports = mongoose.model('User', userSchema);
