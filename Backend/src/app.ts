import cors from "cors"
import cookieParse from "cookie-parser"
import express from "express"

const app =express();

app.use(cors());
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let total_users=[];

app.use(async (req,res)=>{
    total_users.push(req.ip)
    console.log(total_users);
})

export default app;