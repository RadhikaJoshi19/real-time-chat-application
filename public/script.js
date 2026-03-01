const socket = io();

let username = "";
let room = "";

function joinRoom() {
    username = document.getElementById("username").value;
    room = document.getElementById("room").value;

    if (!username || !room) {
        alert("Enter username and room");
        return;
    }

    socket.emit("joinRoom", { username, room });

    document.getElementById("login-container").style.display = "none";
    document.querySelector(".chat-container").style.display = "block";
    document.getElementById("room-name").innerText = `Room: ${room}`;
}

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chatMessage", input.value);
        input.value = "";
    }
});

socket.on("message", (msg) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
