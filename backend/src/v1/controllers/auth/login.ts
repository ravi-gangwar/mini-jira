import UserModel from "../../../database/schema/UserSchema.js";
import type { Request, Response } from "express";
import z, { ZodError } from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserZod = z.object({
    email : z.email(),
    password: z.string().min(8),
})

const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = UserZod.parse(req.body);

        const user = await UserModel.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({message: "Invalid email or password", status: 401});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(!isPasswordCorrect){
            return res.status(401).json({message: "Invalid email or password", status: 401});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "1d"});

        return res.status(200).json({message: "Login successful", status: 200, token});

    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400).json({
                errors: error.issues,
                status: 400,
                message: "Validation failed",
            })
        }
        const customMessage = error instanceof Error ? error.message : undefined;
        return res.status(500).json({ message: "Internal server error", status: 500, customMessage });
    }
}

export default login;