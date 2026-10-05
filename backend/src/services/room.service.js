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
}

const joinRoom= async(data)=>{
const room= await prisma.room.findUnique({
    
    where:{
        inviteCode:data.inviteCode
    }

})
console.log(room)
console.log(data)
    if(!room){
        throw new Error('Room Not found')
    }
    const existingMember=await prisma.roomMember.findUnique({
        where:{
            roomId_userId:{
                roomId:room.id,
                userId:data.userId            
            }
        }
    })
    if(existingMember){
        throw new Error('You are already the memeber')
    }

    const membership=await prisma.roomMember.create({
        data:{
            roomId:room.id,
            userId:data.userId,
        }
}
    )
    return{
        room,
        membership
    }



}

module.exports = {
    createRoom,
    joinRoom
};