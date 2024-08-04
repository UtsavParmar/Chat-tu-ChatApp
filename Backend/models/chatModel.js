const mongoose=require("mongoose")

const chatSchema=mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },],
   
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[],
        ref:"Message"
    },]

},{timestamps:true})

const Conversation=mongoose.model("Conversation",chatSchema)
module.exports= Conversation