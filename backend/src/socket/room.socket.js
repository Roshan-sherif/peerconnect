
const prisma = require("../config/prisma");

const registerRoomHandlers = (io, socket) => {
    socket.on("join-room", async (data, callback) => {
        try {
            const inviteCode = data?.inviteCode;

            if (!inviteCode || typeof inviteCode !== "string") {
                return callback?.({
                    success: false,
                    message: "Valid invite code is required",
                });
            }

            // Find the room using its invite code.
            const room = await prisma.room.findUnique({
                where: {
                    inviteCode: inviteCode.trim().toUpperCase(),
                },
                select: {
                    id: true,
                },
            });

            if (!room) {
                return callback?.({
                    success: false,
                    message: "Room not found",
                });
            }

            // Verify that the authenticated user belongs to this room.
            const membership = await prisma.roomMember.findUnique({
                where: {
                    roomId_userId: {
                        roomId: room.id,
                        userId: socket.user.id,
                    },
                },
            });

            if (!membership) {
                return callback?.({
                    success: false,
                    message: "You are not a member of this room",
                });
            }

            // Join only after authorization succeeds.
            await socket.join(`room-${room.id}`);

            console.log(
                `User ${socket.user.id} joined room-${room.id}`
            );

            return callback?.({
                success: true,
                roomId: room.id,
            });
        } catch (error) {
            console.error("Join room error:", error);

            return callback?.({
                success: false,
                message: "Failed to join room",
            });
        }
    });
};

module.exports = registerRoomHandlers;
