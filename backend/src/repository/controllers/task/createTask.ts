import type { Request, Response } from "express";
import { TaskPriority, TaskStatus } from "../../../types/types.js";
import z, { ZodError } from "zod";
import TaskModel from "../../../database/schema/TaskSchema.js";


const taskZod = z.object({
    title: z.string().min(4),
    status: z.enum(TaskStatus),
    priority: z.enum(TaskPriority),
    deadline: z.preprocess((val) => {
        if (!val || val === "") return undefined;
        return typeof val === "string" || val instanceof Date ? new Date(val) : val;
    }, z.date().optional()),
    projectId: z.string(),
})

const createTask = async (req: Request, res: Response) => {
    try {
        const {projectId, title, status, priority, deadline} = taskZod.parse(req.body);

        const task = await TaskModel.create({projectId, title, status, priority, deadline});

        if(!task){
            return res.status(400).json({message: "Task creation failed", status: 400});
        }

        return res.status(201).json({message: "Task created successfully", status: 201, task});
    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400).json({
                errors: error.issues,
                message: "Validation failed",
                status: 400,
            })
        }
        const customMessage = error instanceof Error ? error.message : undefined;
        return res.status(500).json({message: "Internal server error", status: 500, customMessage});
    }
}

export default createTask;