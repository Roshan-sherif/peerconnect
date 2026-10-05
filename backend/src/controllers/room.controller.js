const { success } = require("zod");
const { createRoom, joinRoom } = require("../services/room.service");

const createRoomController= async (req,res)=>{
    console.log(req.user.id)
    try {
        const {name,description}=req.body
        if(!name||name.trim()===""){
            return res.status(400).json({
                success:false,
                messgae:'Room name is required'
            })
        }

        const userId=req.user.id
        const room=await createRoom({
            name:name.trim(),
            description: description?.trim() || null,
            userId
        })
        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            room,
        });

    } catch (error) {
                console.error("Create room error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create room",
        });

    }
}

const joinRoomController=async(req,res)=>{
    try{
        const inviteCode=req.body.inviteCode
        console.log(inviteCode)

        if(!inviteCode||inviteCode.trim()===''){
            return res.status(400).json({
                success:false,
                message:"Invite code is required"
            })
        }
        console.log(req.user.id)
            const userId=req.user.id

    const result=await joinRoom({
        inviteCode:inviteCode.trim().toUpperCase(),
        userId,
    })
    console.log(result)

            return res.status(200).json({
            success: true,
            message: "Joined room successfully",
            room: result.room,
            membership: result.membership,
        });



    }catch(error){
        console.log('JOIN ROOM ERROR:', error)

        if(error.message==='Room not found'){
            return res.status(404).json({
                success:false,
                message:'Invalid invite code'
            })
        }
    };

    if(error.message==='You are already a member of this room'){
        return res.status(409).json({
            success:false,
            message:error.message,
        })
    }

            return res.status(500).json({
            success: false,
            message: "Failed to join room",
        });



    


}
module.exports={
    createRoomController,
    joinRoomController
}