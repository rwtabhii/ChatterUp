import mongoose from "mongoose";


const usersOnlineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    socketId : String
});


const onlineUserModel = new mongoose.model("onlineUser",usersOnlineSchema);


export default  onlineUserModel;