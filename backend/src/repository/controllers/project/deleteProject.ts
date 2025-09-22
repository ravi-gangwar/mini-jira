import ProjectModel from "../../../database/schema/ProjectSchema.js";
import type { Request, Response } from "express";
import z, { ZodError } from "zod";

const projectZod = z.object({
    projectId: z.string(),
})

const deleteProject = async (req: Request, res: Response) => {
    try {
        const {projectId} = projectZod.parse(req.body);

        const project = await ProjectModel.findById(projectId);

        if(project?.userId.toString() !== req.userId){
            return res.status(401).json({message: "Unauthorized", status: 401});
        }

        if(!project){
            return res.status(400).json({message: "Project not found", status: 400});
        }

        await ProjectModel.findByIdAndDelete(projectId).where("userId").equals(req.userId);

        return res.status(200).json({message: "Project deleted successfully", status: 200});
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

export default deleteProject;