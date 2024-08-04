const User = require("../models/userModel");

const getUsers=async (req,res)=>{
    try {
        const loggedInUserId=req.user._id
        const allUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        
        res.status(200).json(allUsers)
    } catch (error) {
        console.error("Error in User Controller ",error);
        res.status(500).json({error:"Internal server Error"})
    }
}

module.exports=getUsers