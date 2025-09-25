import mongoose from "mongoose";

export const db =async ()=>{
   if(process.env.MONGO_DB_CONNECTION_URL){
      const status = await  mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
      console.log(status.connection.host);
   }
}


