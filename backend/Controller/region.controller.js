const Region = require("../Models/region.model")

exports.addRegion = async(req,res)=>{
    try{
        const {regionName, subRegion} = req.body;
        if(!regionName || !subRegion){
            return res.status(400).json({
                success:false,
                message:"Please fill all the required field"
            })
        }

        const newRegion = await Region.create({regionName, subRegion})
        return res.status(200).json({
            success:true,
            message:"Region added successfully",
            newRegion
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while add region",
            errorMessage:error.message
        })
    }
}

exports.getAllRegion = async(req,res)=>{
    try{
        const allRegions = await Region.find({});
        return res.status(200).json({
            success:true,
            message:"All region fetched successfully",
            allRegions
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while getting all region",
            errorMessage:error.message
        })
    }
}

exports.updateRegion = async(req,res)=>{
    try{
        const {regionId, regionName, subRegion} = req.body;
        if(!regionId){
            return res.status(401).json({
                success:false,
                message:"Region Id not found"
            })
        }
        if(!regionName && !subRegion){
            return res.status(401).json({
                success:false,
                message:"Please provide atleast one field to be updated"
            })
        }
        
        const updateFields = {};
        if (regionName?.trim()) updateFields.regionName = regionName.trim();
        if (subRegion?.trim()) updateFields.subRegion = subRegion.trim();
                
                
        const updatedRegion = await Region.findByIdAndUpdate(
            { _id: regionId },
            { $set: updateFields },
            { new: true } 
        );
        
        return res.status(200).json({
            success:true,
            message:"Region updated",
            updatedRegion
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while update region",
            errorMessage:error.message
        })
    }
}

exports.deleteRegion = async(req,res)=>{
    try{
        const {regionId} =req.body;
        if(!regionId){
            return res.status(401).json({
                success:false,
                message:"Region Id not found "
            })
        }
        await Region.findByIdAndDelete({_id:regionId})
        return res.status(200).json({
            success:true,
            message:"Region Deleted"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while delete region",
            errorMessage:error.message
        })
    }
}