import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGODB_URI } = process.env;

const dbConnect = async(req, res) => {
     try {
        await mongoose.connect(MONGODB_URI, {
            });
            console.log(`DB Connected Successfully`);
     } catch (error) {
        console.error(`DB Connection Failed`);
        console.error(error);
     }
}

export default dbConnect;