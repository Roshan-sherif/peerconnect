const { success } = require("zod");
const { createRoom } = require("../services/room.service");

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
module.exports={
    createRoomController
}