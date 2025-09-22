import { Router } from "express";
import v1AuthRouter from "./services/auth.js";
import authMiddleware from "../middleware/authMiddleware.js";
import v1ProjectRouter from "./services/project.js";
import v1TaskRouter from "./services/task.js";

const V1Router = Router();

V1Router.use("/auth", v1AuthRouter);

V1Router.use("/project", authMiddleware, v1ProjectRouter);

V1Router.use("/task", authMiddleware, v1TaskRouter);

export default V1Router;