import mongoose from "mongoose";


const EnquirySchema=new mongoose.Schema({
    expertId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Expert"
    },
    farmerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Farmer"
    },
    date:{
        type:Date,
    }
},{
    timestamps:true
})

export const EnquiryModel = mongoose.model("Enquiry",EnquirySchema)