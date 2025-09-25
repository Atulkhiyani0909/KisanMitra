import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";



const FarmerSchema = new mongoose.Schema({
    name: String,
    mobNumber: String,
    location: String,
    farmSize: String,
    crops: [],
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },
    animals: []
}, {
    timestamps: true
})

FarmerSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
});

FarmerSchema.methods.comparePassword=async function(candidatePassword:any){
    return await bcrypt.compare(candidatePassword,this.password);
}

FarmerSchema.methods.generateAccessToken=function(){
    //@ts-ignore
    return jwt.sign({
        _id:this._id,
        name:this.username,
        mobNumber:this.mobNumber,
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRATION || ""
    }
)
}

//generally for moree time than access token
FarmerSchema.methods.generateRefreshToken=function(){
    //@ts-ignore
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET || "",
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRATION || ""
    }
)
}

export const Farmer = mongoose.model('Farmer', FarmerSchema);
