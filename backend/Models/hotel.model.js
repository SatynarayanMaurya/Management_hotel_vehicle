const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
    hotelName:{
        type:String,
        requried:true
    },
    price:{
        type:String,
        requried:true
    },
    address:{
        type:String,
        requried:true
    },
    region:{
        type:String,
        requried:true
    }
})

module.exports = mongoose.model("Hotel", hotelSchema)