const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { SocketAddress } = require("net");

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:3000"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    // socket.on('room', (room) => {
    //     socket.join(room)

    // })
    socket.on('chat message', (msg, room) => {
        // socket.join(room)
        // socket.to(room).emit('message', msg)
        // io.to(room).emit("message", msg)
        if (room == '') {
            socket.broadcast.emit('get-message', msg)
        }
        socket.join(room)
        socket.broadcast.to(room).emit('get-message', msg)
    })
})

instrument(io, {
    auth: false
});

httpServer.listen(9000);