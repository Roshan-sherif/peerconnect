const { email } = require("zod");
const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");


const signupUser=async(data)=>{
    const existingUser =await prisma.user.findUnique({
        where:{
            email:data.email,
        },
    })

    if (existingUser){
        throw new Error("Email already exists")
    }
    const user= await prisma.user.create({
        data:{
            name:data.name,
            username:data.username,
            email:data.email,
            password:hashPassword
        }
    })
        const token = generateToken(user.id);
    return{
        user,
        token,
    }

}
module.exports-{
    signupUser,
}