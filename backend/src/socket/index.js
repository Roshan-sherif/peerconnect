const registerRoomHandlers = require("./room.socket");

const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        registerRoomHandlers(io, socket);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = registerSocketHandlers;