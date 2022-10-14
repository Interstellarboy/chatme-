const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const createAdapter = require("@socket.io/redis-adapter").createAdapter;
const redis = require("redis");
const moment = require("moment")

const { createClient } = redis;


(async () => {
    pubClient = createClient({ url: "redis://127.0.0.1:6379" });
    await pubClient.connect();
    subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));
})();


const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:3000"],
        credentials: true
    }
});

let last8Messages = []


function userCreate(id, username, room) {
    const usercreate = {
        id,
        username,
        room
    }
    const doesExist = users.find((find) => find.id === id)
    if (doesExist != null) return userCreate

    users.push(usercreate)

    return usercreate
}

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}
let users = []

function getUser(id) {
    return users.find(userfind => userfind.id === id)

}

let user

io.on("connection", (socket) => {
    socket.on('room join', (username, room) => {
        user = userCreate(socket.id, username, room)
        // socket.join(user.room)
        io.emit('joined', `${username} joined the room ${room}`)
    })

    socket.on('get-message', (msg, username) => {
        // const userRoom = user[0].room
        // const username = user[0].username
        socket.join(user.room)
        last8Messages.push(formatMessage(username, msg))

        io.to(user.room).emit('message', last8Messages)
        if (last8Messages.length >= 10) {
            last8Messages.shift();
        }

        // console.log(socket.id, users)
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