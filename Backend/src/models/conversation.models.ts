import mongoose from "mongoose";


const ConversationSchema=new mongoose.Schema({
    farmerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Farmer"
    },
    summary:{
        type:String
    }
},{
    timestamps:true
})

export const ConversationModel= mongoose.model("Conversation",ConversationSchema)