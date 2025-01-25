const Vehicle = require("../Models/vehicle.model")

exports.addVehicle = async(req,res)=>{
    try{
        const {vehicleName, type, price, region} = req.body;

        if(!vehicleName || !type || !price || !region){
            return res.status(400).json({
                success:false,
                message:"Please fill all the required field"
            })
        }

        const newVehicle = await Vehicle.create({vehicleName, type,price,region})
        return res.status(200).json({
            success:true,
            message:"Vehicle add successfully",
            newVehicle
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while add vehicle",
            errorMessage:error.message
        })
    }
}


exports.getAllVehicles = async(req,res)=>{
    try{
        const vehicles = await Vehicle.find({})
        return res.status(200).json({
            success:true,
            message:"All vehicles are fetched",
            vehicles
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while getting all vehicle",
            errorMessage:error.message
        })
    }
}


exports.updateVehicle = async(req,res)=>{
    try{
        const {vehicleId, vehicleName, type, price,region}= req.body;
        if(!vehicleId){
            return res.status(400).json({
                success:false,
                message:"Vehicle Id not found"
            })
        }
        if(!vehicleName && !type && !price && !region){
            return res.status(400).json({
                success:false,
                message:"Please provide atleast one field to be updated"
            })
        }

        const updateFields = {};
        if (vehicleName?.trim()) updateFields.vehicleName = vehicleName.trim();
        if (price?.trim()) updateFields.price = price.trim();
        if (type?.trim()) updateFields.type = type.trim();
        if (region?.trim()) updateFields.region = region.trim();
        
        
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            { _id: vehicleId },
            { $set: updateFields },
            { new: true } 
        );

        
        return res.status(200).json({
            success:true,
            message:"Vehicle updated",
            updatedVehicle
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while update vehicle",
            errorMessage:error.message
        })
    }
}

exports.deleteVehicle = async(req,res)=>{
    try{
        const {vehicleId} = req.body;
        if(!vehicleId){
            return res.status(400).json({
                success:false,
                message:"Vehicle Id not found"
            })
        }
        await Vehicle.findByIdAndDelete({_id:vehicleId});
        return res.status(200).json({
            success:true,
            message:"Vehicle Deleted"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while Delete vehicle",
            errorMessage:error.message
        })
    }
}