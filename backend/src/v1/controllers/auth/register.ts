import {z, ZodError} from "zod"
import type { Request, Response } from "express";
import UserModel from "../../../database/schema/UserSchema.js";
import responseMessage from "../../../constant/constant.js";
import bcrypt from "bcrypt";


const User = z.object({
    name: z.string().min(4),
    email: z.email(),
    password: z.string().min(8),
    gender: z.enum(["male", "female"]),
})

const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password, gender} = User.parse(req.body);

        const isUserExist = await UserModel.findOne({ email });

        if(isUserExist) {
            return res.status(400).json({message:"User already exists", status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await UserModel.create({ name, email, password: hashedPassword, gender });
        const { password: _password, ...safeUser } = user.toObject();

        return res.status(201).json({ message: responseMessage.userCreated, status: 201, user: safeUser });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: 400,
                message: "Validation failed",
                errors: error.issues,
            });
        }
        const customMessage = error instanceof Error ? error.message : undefined;
        return res.status(500).json({ message: "Internal server error", status: 500, customMessage });
    }
}

export default register;