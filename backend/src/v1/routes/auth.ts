import { Router } from "express";
import register from "../controllers/auth/register.js";
import login from "../controllers/auth/login.js";

const v1AuthRouter = Router();

v1AuthRouter.post("/register", register);

v1AuthRouter.post("/login", login);

export default v1AuthRouter;