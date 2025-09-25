import * as z from "zod";

export const FarmerSchema = z.object({
  name:z.string(),
  mobNumber:z.number(),
  password:z.string().min(8,"Min of 8"),
  location:z.string(),
  farmSize:z.string().optional(),
  crops:z.array(z.string()).optional(),
  animals:z.array(z.string()).optional()
});

export const SigninSchema = z.object({
  mobNumber: z.number({ error: "Mobile number is required" }),
  password: z.string({ error: "Password is required" })
});