const mongoose = require("mongoose")

const regionSchema = new mongoose.Schema({

    regionName:{
        type:String,
        requried:true
    },
    subRegion:{
        type:String,
        requried:true
    }
})

module.exports = mongoose.model("Region", regionSchema)