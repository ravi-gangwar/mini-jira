import ProjectModel from "../../../database/schema/ProjectSchema.js";
import type { Request, Response } from "express";
import z from "zod";


const projectZod = z.object({
    page: z.number(),
    limit: z.number(),
})

const getProjects = async (req: Request, res: Response) => {
    try {
        const _id = req.userId;
        const {page, limit} = projectZod.parse(req.params);
        const projects = await ProjectModel.find({userId: _id}).skip((page - 1) * limit).limit(limit);

        if(!projects){
            return res.status(400).json({message: "Projects not found", status: 400});
        }

        return res.status(200).json({message: "Projects fetched successfully", status: 200, projects});
    } catch (error) {
        const customMessage = error instanceof Error ? error.message : undefined;
        return res.status(500).json({message: "Internal server error", status: 500, customMessage});
    }
}

export default getProjects;