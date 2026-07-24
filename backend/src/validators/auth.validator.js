const { z } = require("zod");

const signupSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

module.exports = {
    signupSchema,
};