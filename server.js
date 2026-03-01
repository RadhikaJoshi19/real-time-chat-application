const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

    socket.on("joinRoom", ({ username, room }) => {
        socket.join(room);
        socket.username = username;
        socket.room = room;

        io.to(room).emit("message", {
    user: "System",
    text: `${username} has joined the room`
});
    });

    socket.on("chatMessage", (msg) => {
        io.to(socket.room).emit("message", {
            user: socket.username,
            text: msg
        });
    });

    socket.on("disconnect", () => {
        if (socket.room) {
            io.to(room).emit("message", {
                user: "System",
                text: `${socket.username} has left the room`
            });
        }
    });

});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
