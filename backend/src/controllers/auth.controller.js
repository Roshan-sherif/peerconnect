const { signupSchema } = require("../validators/auth.validator")
const { signupUser } = require("../services/auth.service");
const { success } = require("zod");


const signup=async(req,res)=>{
    try{
        const data=signupSchema.parse(req.body)
        const result=await signupUser(data)
        console.log('asfd')

        res.status(201).json({
            success:true,
            message:'Account created successfully',
            ...result,
        })
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