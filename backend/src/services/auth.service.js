const { email } = require("zod");
const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const generateToken = require("../utils/jwt");


const signupUser = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    })
    console.log(data)
    if (existingUser) {
        throw new Error("Email already exists")
    }
    const hashpass = await hashPassword(data.password)
    const user = await prisma.user.create({
        data: {
            name: data.fullName,
            email: data.email,
            password: hashpass
        }
    })
    const token = generateToken(user.id);
    return {
        user,
        token,
    }

}

const loginUser = async (data) => {
    console.log(data.email)
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    console.log(user)

    if (!user) {
        throw new Error("Invalid email or password")

    }
    const isMatch = await comparePassword(data.password, user.password)
        if (!isMatch) {
        throw new Error("Invalid email or password")
        }


    console.log(isMatch)
    if (isMatch) {
        const token = generateToken(user.id);

        return { user, token }
    }
}


module.exports = {
    signupUser,
    loginUser
}