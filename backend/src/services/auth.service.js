const { email } = require("zod");
const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");
const generateToken = require("../utils/jwt");


const signupUser=async(data)=>{
    const existingUser =await prisma.user.findUnique({
        where:{
            email:data.email,
        },
    })
    console.log(data)
    if (existingUser){
        throw new Error("Email already exists")
    }
    const hashpass= await hashPassword(data.password)
    console.log(hashPassword)
    const user= await prisma.user.create({
        data:{
            name:data.fullName,
            email:data.email,
            password:hashpass
        }
    })
        const token = generateToken(user.id);
        console.log(token)
    return{
        user,
        token,
    }

}
module.exports={
    signupUser,
}