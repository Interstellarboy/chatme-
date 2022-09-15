const path = require('path')
const express = require("express")
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))


})

io.on('connection', (socket) => {
    console.log('socket connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })

})

server.listen(3000, () => {
    console.log('connected to port 3000')
})
