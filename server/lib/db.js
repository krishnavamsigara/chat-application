import mongoose from "mongoose";

//function to connect db
export const connectDB = async () =>{
    try {
        mongoose.connection.on('connected',()=>console.log("db connected"))
        await mongoose.connect(`${process.env.URI}/chat-app`)
        
    } catch (error) {
        console.log(error)
        
    }
}