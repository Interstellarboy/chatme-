// const path = require('path')
// const express = require("express")
// // const http = require('http')
// // const { Server } = require('socket.io')
// const app = express()
// const server = http.createServer(app)
// const io = new Server(server)
const { instrument } = require("@socket.io/admin-ui")
const io = require('socket.io')(5000, {
    cors: {
        origin: ['http://localhost:3000', "https://admin.socket.io", "http://localhost:5000/admin"],
        crendentials: true
    }
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + "/index.html"))


// })

io.on('connection', (socket) => {
    console.log('socket connected');
    socket.on('chat message', (msg) => {
        socket.join(msg)
        io.to(msg).emit('chat message', msg)
    })
    // socket.on('join-room', (room, msg) => {
    //     io.to(room).emit('room-message', msg)
    // })
    //io.to(room) //io.broadcast etc //@socket.io/admin //socket.io-client
})

instrument(io, {
    auth: false
})

// app.listen(5000, () => {
//     console.log('connected to port 5000')
// })
