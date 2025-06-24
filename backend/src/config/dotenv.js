import dotenv from "dotenv";


dotenv.config();


export const env = {
    db: process.env.MONGODB_URL,
    port: process.env.PORT
}