const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const socketAuth = async (socket, next) => {
try {
const token = socket.request.headers.cookie
?.split("; ")
.find((cookie) => cookie.startsWith("token="))
?.split("=")
.slice(1)
.join("=");

    if (!token) {
        return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    if (!user) {
        return next(new Error("User not found"));
    }

    socket.user = user;

    next();
} catch (error) {
    console.error("Socket authentication failed:", error.message);
    next(new Error("Invalid or expired token"));
}

};

module.exports = socketAuth;
