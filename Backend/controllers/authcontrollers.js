const User=require("../models/userModel")
const bcrypt=require("bcryptjs");
const generateToken = require("../utils/generateToken");
const signup=async(req,res)=>{
    try{

        const {fullName,userName,password,confirmPass,gender}=req.body

        if(password!==confirmPass){
           return res.status(400).json({error:"password don't match"});
        }
        const user=await User.findOne({userName})
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        const profile_male=`https://avatar.iran.liara.run/public/boy?username=${userName}`
        const profile_girl=`https://avatar.iran.liara.run/public/girl?username=${userName}`

        const salt=await bcrypt.genSalt(10)
        const hashedpass= await bcrypt.hash(password,salt)

        const newUser= await User.create({
            fullName,
            userName,
            password:hashedpass,
            gender,
            profimg:gender=="male"? profile_male:profile_girl
        })

        generateToken(newUser._id,res)
        // await newUser.save()
        

        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullName,
            username:newUser.userName,
            prof_pic:newUser.profimg
        })

    }
    catch(error){
        console.log("Error in signup controllers",error);
        res.status(500).json({error:"Internal server error"})
    }

}
const login=async(req,res)=>{
    
    try {

        const {userName,password}=req.body
        const userExist= await User.findOne({userName})

        const isPassword= await bcrypt.compare(password, userExist? userExist.password : "")

        if(userExist && isPassword){
            generateToken(userExist._id,res)
            res.status(201).json({

                username:userExist.userName,
                fullName:userExist.fullName,
                _id:userExist._id,
                prof_pic:userExist.profimg
            })
        }
        else{
            return res.status(400).json({
                error:"Invalid username or password"
            })
        }
        // console.log(isPassword,userExist);
        
    } catch (error) {
        console.log("Error in login controllers",error);
        res.status(500).json({error:"internal server error"})
    }
}
const logout=async(req,res)=>{
    
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({msg:"logged out Successfully"})
    } catch (error) {
        console.log("Error in logout controllers",error);
        res.status(500).json({error:"internal server error"})
    }
}

module.exports={
    login,signup,logout
}