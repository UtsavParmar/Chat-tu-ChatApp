const mongoose=require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const connectMongo=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connected to MongoDB");
    }
    catch(err){
        console.log("Error connecting to MongoDB",err.message);
    }
}
module.exports=connectMongo