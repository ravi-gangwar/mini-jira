import z, { ZodError } from "zod";
import ProjectModel from "../../../database/schema/ProjectSchema.js";
import TaskModel from "../../../database/schema/TaskSchema.js";
import type { Request, Response } from "express";
import { TaskPriority, TaskStatus } from "../../../types/types.js";

const projectZod = z.object({
    projectId: z.string(),
    priority: z.enum(TaskPriority),
    status: z.enum(TaskStatus),
    deadline: z.date(),
})

const getProjectTasksById = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;


        const {projectId, priority, status, deadline } = projectZod.parse(req.params);

        const project = await ProjectModel.findById(projectId);

        if(!project){
            return res.status(400).json({message: "Project not found", status: 400});
        }

        if(project?.userId.toString() !== userId){
            return res.status(401).json({message: "Unauthorized", status: 401});
        }

        let tasks = await TaskModel.find({projectId}).where("priority").equals(priority).where("status").equals(status).where("deadline").equals(deadline);

        if(!tasks){
            return res.status(400).json({message: "Tasks not found", status: 400});
        }

        return res.status(200).json({message: "Tasks fetched successfully", status: 200, tasks});
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

export default getProjectTasksById;