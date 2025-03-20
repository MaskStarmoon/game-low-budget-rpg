const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

let players = {};

io.on("connection", (socket) => {
    console.log("Pemain terhubung:", socket.id);
    
    // Tambah pemain baru
    players[socket.id] = { x: 200, y: 200, hp: 100, exp: 0 };
    
    io.emit("updatePlayers", players);
    
    // Pemain bergerak
    socket.on("move", (direction) => {
        let player = players[socket.id];
        if (direction === "up") player.y -= 10;
        if (direction === "down") player.y += 10;
        if (direction === "left") player.x -= 10;
        if (direction === "right") player.x += 10;

        io.emit("updatePlayers", players);
    });

    // Pemain keluar
    socket.on("disconnect", () => {
        console.log("Pemain keluar:", socket.id);
        delete players[socket.id];
        io.emit("updatePlayers", players);
    });
});

server.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});
