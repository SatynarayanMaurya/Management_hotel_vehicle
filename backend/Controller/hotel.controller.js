
const Hotel = require("../Models/hotel.model")

exports.addHotel = async(req,res)=>{
    try{
        const {hotelName, price, address, region}= req.body;

        if(!hotelName || !price || !address || !region){
            return res.status(401).json({
                success:false,
                message:"Please fill all the required field"
            })
        }
        const newHotel = await Hotel.create({hotelName,price,address,region})
        return res.status(200).json({
            success:true,
            message:"Hotel added successfully",
            newHotel

        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error while add Hotel",
            errorMessage:error.message
        })
    }
}

exports.getAllHotels = async(req,res)=>{
    try{
        const hotels = await Hotel.find({});
        return res.status(200).json({
            success:true,
            message:"All hotels fetched",
            hotels
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error while get all Hotel",
            errorMessage:error.message
        })
    }
}

exports.updateHotel = async(req,res)=>{
    try{
        const {hotelId,hotelName,price,address,region} = req.body;

        if(!hotelId){
            return res.status(401).json({
                success:false,
                message:"Hotel Id not found"
            })
        }

        if(!hotelName && !price && !address && !region){
            return res.status(401).json({
                success:false,
                message:"Please provide atleast one field to be updated"
            })
        }
        const updateFields = {};
        if (hotelName?.trim()) updateFields.hotelName = hotelName.trim();
        if (price?.trim()) updateFields.price = price.trim();
        if (address?.trim()) updateFields.address = address.trim();
        if (region?.trim()) updateFields.region = region.trim();


        const updatedHotel = await Hotel.findByIdAndUpdate(
            { _id: hotelId },
            { $set: updateFields },
            { new: true } // Return updated document and validate inputs
          );
        return res.status(200).json({
            success:true,
            message:"Hotel updated successfully",
            updatedHotel
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error while Update Hotel",
            errorMessage:error.message
        })
    }
}

exports.deleteHotel = async(req,res)=>{
    try{
        const {hotelId} = req.body;
        if(!hotelId){
            return res.status(401).json({
                success:false,
                message:"Hotel Id not found"
            })
        }
        await Hotel.findByIdAndDelete({_id:hotelId})
        return res.status(200).json({
            success:true,
            message:"Hotel Deleted"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error while delete Hotel",
            errorMessage:error.message
        })
    }
}