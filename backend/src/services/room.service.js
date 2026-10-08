const prisma = require("../config/prisma");

const generateInviteCode = () => {
    return Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
};

const createRoom = async ({ name, description, userId }) => {

    let inviteCode;

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
}

const joinRoom = async (data) => {
    const room = await prisma.room.findUnique({

        where: {
            inviteCode: data.inviteCode
        }

    })
    console.log(room)
    console.log(data)
    if (!room) {
        throw new Error('Room Not found')
    }
    const existingMember = await prisma.roomMember.findUnique({
        where: {
            roomId_userId: {
                roomId: room.id,
                userId: data.userId
            }
        }
    })
    if (existingMember) {
        throw new Error('You are already the memeber')
    }

    const membership = await prisma.roomMember.create({
        data: {
            roomId: room.id,
            userId: data.userId,
        }
    }
    )
    // if (membership){
    //     const roomMembers=await prisma.roomMember.findMany({
    //         where:{roomId:room.id}
    //     })
    //     console.log(roomMembers)
    // }
    return {
        room,
        membership
    }



}
const getRoomUsers=async (data)=>{
    console.log(data)

        const userId=data.user

        const room= await prisma.room.findUnique({
        where:{
            inviteCode:data.inviteCode.inviteCode
        },
        include:{
            
            members:{
                include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }}
            }
            
        }
    })

    console.log(room)
    if(!room){
        throw new Error('Room not found')
    }

    const isMember = room.members.some(
        (member) => member.userId === userId
    );


    if (!isMember) {
        throw new Error("You are not a member of this room");
    }

    console.log(room)
    return room

}
module.exports = {
    createRoom,
    joinRoom,
    getRoomUsers
};