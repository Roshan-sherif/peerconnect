const { signupSchema, loginSchema } = require("../validators/auth.validator")
const { signupUser, loginUser } = require("../services/auth.service");


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

const login= async(req,res)=>{

        try {
        const data=loginSchema.parse(req.body)
        const {user,token} = await loginUser(data)


            res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:7*24*60*60*1000,

        })

        
        res.status(200).json({
            success:true,
            message:'Account logged successfully',
                        user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },

        })

        } catch (error) {
                    console.log(error)

        if (error.message === "Invalid email or password") {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }

        // Validation error
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: error.errors[0].message,
            });
        }

        // Unknown error
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

            
        }
        
}

const logout=async(req,res)=>{
    res.clearCookie("token");

res.status(200).json({
    success: true,
    message: "Logged out successfully",
});
}

const getCurrentUser = (req, res) => {
    res.status(200).json({
        success: true,
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        },
    });
};


module.exports = {
    signup,
    login,
    logout,
    getCurrentUser
};