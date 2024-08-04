const Conversation=require("../models/chatModel")
const Message=require("../models/messageModel")
const { getReceiverSocketId, io } = require("../socket/socket.js");
const sendMessage=async (req,res)=>{
    try {
        const recieverId=req.params.id
        const {message}=req.body
        const senderId=req.user._id
        // console.log(recieverId);
        let conversation=await Conversation.findOne({
            participants:{
                $all:[senderId,recieverId]
            },
        })

        if(!conversation){
            conversation= await Conversation.create({
                participants:[senderId,recieverId],
            })
        }
        // console.log(conversation);
        const newMessage= await Message.create({
            senderId,
            recieverId,
            message
        })
        if(newMessage){
            await Conversation.updateOne({_id:conversation._id},{ $push: { messages: newMessage._id }})
        }

        const receiverSocketId = getReceiverSocketId(recieverId);
		if (receiverSocketId) {
			
			io.to(receiverSocketId).emit("newMessage", newMessage);
            
		}


        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in Message Controller",error);
        res.status(500).json({error:"Internal server error"})
    }
}

const getMessages=async (req,res)=>{
    try {
        
        const personId=req.params.id
        const senderId=req.user._id
        const conversation=await Conversation.findOne({
            participants:{
                $all:[senderId,personId]
            },
        }).populate("messages")
        
        if (!conversation) return res.status(200).json([]);
        res.status(200).json(conversation.messages)

    } catch (error) {
        console.error("Error in Get Message controller",error);
        res.status(500).json({error:"internal server error"})
    }
}

module.exports={sendMessage,getMessages}