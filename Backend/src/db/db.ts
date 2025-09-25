import mongoose from "mongoose";

export const db =async ()=>{
   const status = await  mongoose.connect('mongodb+srv://nyayasetuportal_db_user:bDtwLzGhDbuTBxKS@cluster0.nlilfbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
   console.log(status.connection.host);
}


