const jwt = require("jsonwebtoken")
require("dotenv").config()
exports.authMiddleware = async(req,res,next) =>{
    try{
        const token = req.cookies.token || req.header('Authorization').split(' ')[1]

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
            next();
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Invalid Token",
                errorMessage:error.message
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error in auth middleware",
            errorMessage:error.message
        })
    }
}