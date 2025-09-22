import { Router } from "express";
import deleteUser from "../controllers/user/deleteUser.js";

const v1UserRouter = Router();

v1UserRouter.post("/delete", deleteUser);

export default v1UserRouter;