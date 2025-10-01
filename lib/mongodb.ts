import { error } from "console";
import mongoose, { mongo } from "mongoose";
import { buffer } from "stream/consumers";

const MONGODB_URL = process.env.MONGO
if(!MONGODB_URL) {
    throw new Error ( "Please define mongo enviroment variable ")
}

async function connectToDatabase() { 
    if (mongoose.connection.readyState === 1){
        return  mongoose;
    }
    const opts = {
        bufferCommands: false,
    }
    await mongoose.connect(MONGODB_URL!, opts);
    return mongoose;
    
}
export default connectToDatabase;