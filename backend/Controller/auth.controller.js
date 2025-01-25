const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../Models/user.model")
const {validationResult} = require("express-validator")


exports.signup = async(req,res)=>{
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(401).json({
                success:false,
                message:" Error",
                error:error
            }) 
       }
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already registered",
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashPassword})

        return res.status(200).json({
            success:true,
            message:"Signup successfully",
            user
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error while signup",
            errorMessage:error.message
        })
    }
}


exports.login = async(req,res)=>{
    try{

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(401).json({
                success:false,
                message:" Error",
                error:error
            }) 
        }

        const {email, password} = req.body;
        const existingUser = await User.findOne({email:email})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }

        // Match password 
        const matchPassword = await bcrypt.compare(password,existingUser.password)

        if(matchPassword){
            const token = jwt.sign(
                {
                    email:email,
                    userId:existingUser._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h"
                }
            )
            const options = {
                expires : new Date(Date.now() + 24 * 3600 * 1000),
                httpOnly:true,
                secure: true
            }
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User logged in",
                token
            })
        }

        else{
            return res.status(401).json({
                success:false,
                message:"Password incorrect"
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error while login",
            errorMessage:error.message
        })
    }
}