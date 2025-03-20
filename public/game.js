const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const socket = io();

let players = {};

socket.on("updatePlayers", (data) => {
    players = data;
    draw();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") socket.emit("move", "up");
    if (e.key === "ArrowDown") socket.emit("move", "down");
    if (e.key === "ArrowLeft") socket.emit("move", "left");
    if (e.key === "ArrowRight") socket.emit("move", "right");
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let id in players) {
        let player = players[id];
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, 20, 20);
    }
}
