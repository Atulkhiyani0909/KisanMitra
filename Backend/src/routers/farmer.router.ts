import { Router } from "express";
import validate from "../middlewares/validation.middleware.js";
import { FarmerSchema } from "../ZodSchema/farmerSchema.js";
import { registerFarmer, signin } from "../controllers/farmer.controller.js";
import { any } from "zod";

const router=Router();

//@ts-ignore
router.route("/register").post(registerFarmer)
router.route("/signin").post(signin)



export default router;