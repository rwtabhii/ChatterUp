import mongoose from "mongoose";
import { env } from "./dotenv.js";

export const createDbConnection = async () => {
    try {
        await mongoose.connect(env.db);
        console.log("MongoDB is connected using the Mongoose");
    }
    catch (err) {
        console.log(err);
    }

}