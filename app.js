const { Socket } = require('engine.io');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
let users = []
const { Server } = require("socket.io");
const io = new Server(server);

let user ={}
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/page/index.html');
})

io.on("connection", (scoket)=>{
      scoket.on("msg", (username)=>{
     
         user[scoket.id] = username['name']
         io.emit('msg', {"username":user[scoket.id], 'content': username['content'], 'id': scoket.id})
       
      })    
  
     
})


server.listen(3000, () => {
  console.log('listening on *:3000');
})