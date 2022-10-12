const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");



const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:3000"],
        credentials: true
    }
});

// let last8Messages = []
// let messageCounter = 0
let user = [{}]
io.on("connection", (socket) => {
    socket.on('room join', (username, room) => {
        function userCreate(username, room) {
            return {
                username,
                room
            }
        }
        user = []
        user.push(userCreate(username, room))
        socket.join(room)
        io.emit('joined', `${username} joined the room ${room}`)

    })
    socket.on('get-message', msg => {
        const userRoom = user[0].room
        socket.join(userRoom)
        socket.broadcast.to(userRoom).emit('message', msg)

    })

})
instrument(io, {
    auth: false
});

httpServer.listen(9000);
// socket.on('chat message', (msg) => {
//     // socket.join(room)
//     // socket.to(room).emit('message', msg)
//     // // io.to(room).emit("message", msg)
//     // if (messageCounter <= 8) {
//     //     last8Messages.push(`${msg}`)
//     //     messageCounter++
//     //     console.log(last8Messages)
//     // }
//     // if (messageCounter == 8) {
//     //     messageCounter = 0
//     //     last8Messages = []
//     //     console.log(last8Messages)
//     // }
//     // if (room == '') {
//     //     socket.broadcast.emit('get-message', msg)
//     // }
//     // socket.join(room)
//     // socket.broadcast.to(room).emit('get-message', msg)
// })