import { timeStamp } from "console";
import mongoose from "mongoose";
// Chat Schema to add messages and user in chat
const chatterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Some text is required"],
    },
    msg: String,
    timestamp : Date,
});

const chat = mongoose.model("Chat", chatterSchema);

export default chat;