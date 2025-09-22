import { Router } from "express";
import createTask from "../controllers/task/createTask.js";

const v1TaskRouter = Router();


v1TaskRouter.post("/create", createTask);

export default v1TaskRouter;