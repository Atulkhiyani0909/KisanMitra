import app from "./app.js";
import { db } from "./db/db.js";


try {
    db();
    app.listen(3000,()=>{
    console.log("Server running on 3000 port ");
})
} catch (error) {
    console.log("Error in connecting to the DataBase ");
}



