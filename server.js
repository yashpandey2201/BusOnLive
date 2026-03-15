const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let buses = {};

io.on("connection",(socket)=>{

console.log("User Connected");

socket.on("send-location",(data)=>{

const {busId,latitude,longitude} = data;

buses[busId] = {latitude,longitude};

io.emit("update-buses",buses);

});

socket.on("disconnect",()=>{
console.log("User Disconnected");
});

});

server.listen(3000,()=>{
console.log("Server running on http://localhost:3000");
});