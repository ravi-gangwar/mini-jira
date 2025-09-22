import { Router } from "express";
import v1AuthRouter from "./routes/auth.js";

const V1Router = Router();

V1Router.use("/auth", v1AuthRouter);

export default V1Router;