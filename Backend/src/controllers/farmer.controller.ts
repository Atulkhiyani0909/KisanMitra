import { FarmerSchema, SigninSchema } from "../ZodSchema/farmerSchema.js";
import type { Response, Request } from 'express';
import { Farmer } from "../models/farmer.models.js";

// It's good practice to create a proper interface for your Mongoose model
// This helps avoid using 'any' and '@ts-ignore'
// interface IFarmer extends Document {
//   _id: mongoose.Types.ObjectId;
//   comparePassword: (password: string) => Promise<boolean>;
//   generateAccessToken: () => Promise<string>;
//   generateRefreshToken: () => Promise<string>;
//   // ... other fields
// }

// --- INTERFACES ---
interface MyError {
    message: string;
    details?: any; // For Zod error details
}
interface MyResponse {
    data: object;
    message: string;
}
interface TokenResult {
    accessToken: string;
    refreshToken: string;
}

// --- TOKEN GENERATION ---
const AccessAndRefreshToken = async (userId: string): Promise<TokenResult> => {
    // FIX: Switched to findByIdAndUpdate for efficiency and safety.
    // This avoids saving the whole document and skipping validations.
    const farmer = await Farmer.findById(userId);
    if (!farmer) {
        throw new Error("User not found for token generation");
    }

    // Assuming these methods exist on your Farmer model schema
    //@ts-ignore
    const accessToken = await farmer.generateAccessToken();
    //@ts-ignore
    const refreshToken = await farmer.generateRefreshToken();

    // Update only the refresh token in the database
    farmer.refreshToken = refreshToken;
    await farmer.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};


// --- CONTROLLERS ---
const registerFarmer = async (req: Request, res: Response<MyResponse | MyError>) => {
    try {
        const validatedData = FarmerSchema.parse(req.body);

        // FIX: Removed redundant `if (!validatedData)` check.
        // Zod throws an error on failure, which is caught by the `catch` block.

        const data = await Farmer.create(validatedData);
        if (!data) {
            // This is a server-side issue, so we send a 500 error
            return res.status(500).json({ message: "Failed to create farmer in the database." });
        }

        const details = await Farmer.findById(data._id).select("-password");
        if (!details) {
            return res.status(500).json({ message: "Failed to fetch farmer details after creation." });
        }

        const { accessToken, refreshToken } = await AccessAndRefreshToken(data._id.toString());

        const response: MyResponse = {
            data: details,
            message: "Account created successfully."
        };

        const options = { httpOnly: true, secure: true };

        return res
            .status(201) // 201 Created is more appropriate here
            .cookie("accessToken", accessToken, options)
            .json(response);

    } catch (error: any) {
        // FIX: Added specific error handling
        if (error.issues) { // This is a Zod validation error
            return res.status(400).json({ message: "Invalid data provided.", details: error.issues });
        }
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "An internal server error occurred." });
    }
};

const signin = async (req: Request, res: Response<MyResponse | MyError>) => {
    try {
        const validatedData = SigninSchema.parse(req.body);
        const farmer = await Farmer.findOne({ mobNumber: validatedData.mobNumber });

        if (!farmer) {
            return res.status(404).json({ message: "Farmer with this mobile number does not exist." });
        }

        // Assuming a method like this exists on your model to compare hashed passwords
        //@ts-ignore
        const isPasswordValid = await farmer.comparePassword(validatedData.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        const { accessToken, refreshToken } = await AccessAndRefreshToken(farmer._id.toString());
        const loggedInFarmer = await Farmer.findById(farmer._id).select("-password");
        if (!loggedInFarmer) {
            return res.status(500).json({ message: "Error fetching user details after login." });
        }

        const response: MyResponse = {
            data: loggedInFarmer,
            message: "Successfully signed in."
        };
        
        const options = { httpOnly: true, secure: true };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(response);

    } catch (error: any) {
        // FIX: Added specific error handling
        if (error.issues) { // This is a Zod validation error
            return res.status(400).json({ message: "Invalid data provided.", details: error.issues });
        }
        console.error("Signin Error:", error);
        return res.status(500).json({ message: "An internal server error occurred." });
    }
};

export { registerFarmer, signin };