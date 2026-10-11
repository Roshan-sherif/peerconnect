require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const registerSocketHandlers = require("./socket");
const socketAuth = require("./middleware/auth.socket");

const PORT = process.env.PORT || 5000;

// Create HTTP server using Express app
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});
io.use(socketAuth)
registerSocketHandlers(io)

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});