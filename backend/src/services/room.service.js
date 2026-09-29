const prisma = require("../config/prisma");

const generateInviteCode = () => {
    return Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
};

const createRoom = async ({ name, description, userId }) => {

    let inviteCode;

    // Generate a unique invite code
    while (true) {

        inviteCode = generateInviteCode();

        const existingRoom = await prisma.room.findUnique({
            where: {
                inviteCode,
            },
        });

        if (!existingRoom) {
            break;
        }
    }

    // Create the room after we have a unique invite code
    console.log()
    const room = await prisma.room.create({
        data: {
            name,
            description,
            inviteCode,
            ownerId: userId,

            members: {
                create: {
                    userId,
                    role: "OWNER",
                },
            },
        },

        include: {
            members: true,
        },
    });

    return room;
};

module.exports = {
    createRoom,
};