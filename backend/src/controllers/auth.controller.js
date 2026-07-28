const { signupSchema } = require("../validators/auth.validator")
const { signupUser } = require("../services/auth.service");


const signup=async(req,res)=>{
    try{
        const data=signupSchema.parse(req.body)
        const {user,token}=await signupUser(data)
        console.log(user)

        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:7*24*60*60*1000,

        })

        
        res.status(201).json({
            success:true,
            message:'Account created successfully',
                        user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },

        })
        console.log('dasf')
    }catch (error) {
        console.log(error)

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}

module.exports = {
    signup,
};