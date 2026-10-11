const { connect } = require("../app");
const prisma = require("../config/prisma");



const registerRoomHandlers = (io, socket) => {
    socket.on("join-room", async (data, callback) => {
        const inviteCode = data.inviteCode
        const room = await prisma.room.findUnique({
            where: {
                inviteCode: inviteCode.trim().toUpperCase(),
            },
        });

        if (!room) {
            return callback?.({
                success: false,
                message: "Room not found",
            });
        }

        socket.join(`room-${room.id}`);
        console.log('successfuly connceted '+room.id)

        callback?.({
            success: true,
            roomId: room.id,
        });
    });

    // Later:
    // socket.on("send-message", ...)
};

module.exports = registerRoomHandlers;