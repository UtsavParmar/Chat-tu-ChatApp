const express=require("express")
const {login,signup,logout}=require("../controllers/authcontrollers")

const router=express.Router()

router.post("/login",login)

router.post("/signup",signup)

router.post("/logout",logout)

module.exports=router