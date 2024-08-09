const express=require("express")
const {sendMessage,getMessages} = require("../controllers/messagecontroller")
const protectRoute=require("../middleware/protectRoute")
const router=express.Router()
const {deleteMessage} =require ("../controllers/messagecontroller")




router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)
router.delete("/delete/:id", protectRoute, deleteMessage);


module.exports=router