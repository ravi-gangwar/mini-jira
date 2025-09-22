import { Router } from "express";
import createProject from "../controllers/project/createProject.js";
import getProjects from "../controllers/project/getProjects.js";
import deleteProject from "../controllers/project/deleteProject.js";
import getProjectTasksById from "../controllers/project/getProjectTasksById.js";

const v1ProjectRouter = Router();


v1ProjectRouter.post("/create", createProject);
v1ProjectRouter.get("/:page/:limit", getProjects);
v1ProjectRouter.get("/:projectId/:priority/:status/:deadline", getProjectTasksById);
v1ProjectRouter.post("/delete", deleteProject);


export default v1ProjectRouter;