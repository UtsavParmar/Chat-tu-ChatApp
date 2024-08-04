const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
const dotenv = require("dotenv");
dotenv.config();
const protectRoute=async (req,res,next)=>{
try {
    const token=req.cookies.jwt

    // console.log(`tooken is ${token}`);
    if(!token){
        return res.status(401).json({
            error:"Unauthorised -No token Provided"
        })
    }
    const verifiedUser= await jwt.verify(token,process.env.JWT_SECRET)

    // console.log("this is verifiedUser",verifiedUser);
    if(!verifiedUser){
        return res.status(401).json({
            error:"Unauthorised -No token Provided"
        })
    }
    const user=await User.findById(verifiedUser.userId)
    if(!user){
        return res.status(404).json({
            error:"User not Found"
        })
    }
    req.user=user 
    next()
} catch (error) {
    console.log("Error in Protect Route Middleware",error);
    res.status(500).json({
        error:"Internal server error"
    })
}
}

module.exports=protectRoute