import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    farmerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Farmer"
    },
    amount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})


export const OrderModel = mongoose.model("Order",OrderSchema)