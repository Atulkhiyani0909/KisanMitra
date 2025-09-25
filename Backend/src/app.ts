import cors from "cors"
import cookieParse from "cookie-parser"
import express from "express"

const app =express();

app.use(cors());
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let total_users=[];



app.use((req, res, next) => {
    total_users.push(req.ip);
    console.log(total_users);
    next(); 
});

import farmerRouter from "./routers/farmer.router.js"
app.use('/api/farmer', farmerRouter)

export default app;