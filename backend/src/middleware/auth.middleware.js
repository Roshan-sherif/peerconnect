const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { success } = require("zod");

const authMiddleware =async (req,res,next)=>{
    try {
        console.log('hello')
        
        const token= req.cookies.token
        console.log(token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Unauthorized'
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)

        const user =await prisma.user.findUnique({

            where:{
                id:decoded.id
            }
            
        })

                if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // 4. Attach user to request
        req.user = user;

        next();



    } catch (error) {
        console.log(error)
                return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });

    }
}

module.exports={
    authMiddleware
}