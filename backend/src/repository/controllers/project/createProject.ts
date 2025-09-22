import type { Request, Response } from "express";
import z, { ZodError } from "zod"
import ProjectModel from "../../../database/schema/ProjectSchema.js";

const projectZod = z.object({
    name: z.string().min(4),
    description: z.string().min(4),
})


const createProject = async (req: Request, res: Response) => {
    try {
        const _id = req.userId;
        const {name, description} = projectZod.parse(req.body);

        const project = await ProjectModel.create({name, description, userId: _id});

        if(!project){
            return res.status(400).json({message: "Project creation failed", status: 400});
        }
        
        return res.status(201).json({message: "Project created successfully", status: 201, project});

    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400).json({
                errors: error.issues,
                messsage: "Validation failed",
                status: 400,
            })
        }
        const customMessage = error instanceof Error ? error.message : undefined;
        return res.status(500).json({message: "Internal server error", status: 500, customMessage});
    }
}

export default createProject;