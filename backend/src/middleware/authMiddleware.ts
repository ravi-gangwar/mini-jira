import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.headers.authorization?.split(" ")[1] ?? "";

        if (!token) {
            return res.status(401).json({ message: "Unauthorized", status: 401 });
        }

        const secret = (process.env.JWT_SECRET as string) || "dev_secret";
        const decoded = jwt.verify(token, secret) as { id?: string };
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Unauthorized", status: 401 });
        }

        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", status: 401 });
    }
}

export default authMiddleware;