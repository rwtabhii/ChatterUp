import { env } from "./src/config/dotenv.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { createDbConnection } from "./src/config/mongoConfig.js";
import chat from "./src/userSchema/chatterSchema.js";
import onlineUserModel from "./src/userSchema/onlineUsers.scema.js";

const app = express();

const server = http.createServer(app);


// create socket server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// socket conneciton
io.on("connection", (socket) => {
    console.log("Socket Connection is Created");
    // taking the user data from the frontend
    socket.on("join", async (data) => {
        const oldMsg = await chat.find().sort({ timeStamp: 1 });
        // console.log(data)
        socket.name = data;
        // console.log(socket.id)
        const addNewOnlineUser = new onlineUserModel({ name: data, socketId: socket.id });
        await addNewOnlineUser.save()
        //  console.log(addNewOnlineUser)
        // sending the old message to the user and send the online username 
        const allOnlineUsers = await onlineUserModel.find({}, { _id: 0, name: 1, socketId: 1 });
        // for the new user connection
        socket.emit("user-list", allOnlineUsers);
        let usersData = {
            socketid: addNewOnlineUser.socketId,
            newuser: addNewOnlineUser.name,
            allOnlineUsers: allOnlineUsers.length
        }
        // for the existing user 
        socket.broadcast.emit("new-user", usersData);
        socket.emit("old-msg", oldMsg);
        socket.emit("user-data", usersData);
    });
    socket.on("typing", (username) => {
        // console.log(username);
        io.emit("user-typing", username);
    });
    socket.on("stoptyping", (username) => {
        io.emit("stop-typing", username);
    })






    socket.on("msg", async (userMsg) => {
        // console.log(userMsg)
        const userData = new chat({ name: userMsg.name, msg: userMsg.msg, timestamp: new Date() });
        await userData.save();
        socket.broadcast.emit("new-msg", userMsg);
    })







    // disconnected with server
    socket.on("disconnect", async () => {
        // console.log(socket.id);
        console.log(socket.name)
        let socketId = socket.id;
        await onlineUserModel.deleteOne({ socketId: socket.id });
        const count = await onlineUserModel.countDocuments();
        socket.broadcast.emit("user-left",socket.name);
        io.emit("remove-user", { socketId, count });

        console.log("Disconnected from server");
    })
});


// server listening port 

server.listen(env.port, () => {
    console.log("Server is listening");
    createDbConnection();

})



