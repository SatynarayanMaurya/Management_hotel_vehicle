const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    vehicleName:{
        type:String,
        requried:true
    },
    price:{
        type:String,
        requried:true
    },
    type:{
        type:String,
        requried:true
    },
    region:{
        type:String,
        requried:true
    }
})

module.exports = mongoose.model("Vehicle", vehicleSchema)