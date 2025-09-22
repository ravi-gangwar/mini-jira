import UserModel from "../../../database/schema/UserSchema.js";
import type { Request, Response } from "express";
import z, { ZodError } from "zod";

const userZod = z.object({
    userId: z.string(),
})

const deleteUser = async (req: Request, res: Response) => {
        try {
        const { userId } = userZod.parse(req.body);

        const user = await UserModel.findById(userId);

        if(!user || user._id.toString() !== req.userId){
            return res.status(401).json({message: "Unauthorized", status: 401});
        }

        await UserModel.findByIdAndDelete(userId);

        return res.status(200).json({message: "User deleted successfully", status: 200});
    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400).json({
                errors: error.issues,
                status: 400,
                message: "Validation failed",
            })
        }
        const customMessage = error instanceof Error ? error.message : undefined;
        return res.status(500).json({message: "Internal server error", status: 500, customMessage});
    }
}

export default deleteUser;