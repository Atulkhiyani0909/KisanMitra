import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// The interface is well-defined. No changes needed here.
export interface IFarmer extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    mobNumber: number;
    password?: string;
    refreshToken?: string;
    location?:string;
    farmSize?:string;
    // Method signatures
    comparePassword(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const FarmerSchema = new mongoose.Schema<IFarmer>({
    // FIX: Using the object syntax for better validation
    name: {
        type: String,
        required: true,
        trim: true
    },
    // FIX: Changed type from String to Number to match the interface
    mobNumber: {
        type: Number,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    farmSize: {
        type: String
    },
    refreshToken: {
        type: String
    },
    // FIX: Explicitly defined as an array of Strings
     //@ts-ignore
    crops: {
        type: [String]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    // FIX: Explicitly defined as an array of Strings
    animals: {
        type: [String]
    }
}, {
    timestamps: true
});


// --- MIDDLEWARE (No changes needed) ---
FarmerSchema.pre<IFarmer>("save", async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// --- METHODS (No changes needed) ---
FarmerSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

FarmerSchema.methods.generateAccessToken = function (): string {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRATION) {
        throw new Error("ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRATION is not defined.");
    }
     //@ts-ignore
    return jwt.sign(
        { _id: this._id, name: this.name, mobNumber: this.mobNumber },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
};

FarmerSchema.methods.generateRefreshToken = function (): string {
    if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_EXPIRATION) {
        throw new Error("REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRATION is not defined.");
    }
    //@ts-ignore
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
};

export const Farmer = mongoose.model<IFarmer>('Farmer', FarmerSchema);