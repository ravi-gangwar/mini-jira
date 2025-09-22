import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token : string = req.headers.authorization?.split(" ")[1] ?? "";
        if(!token){
            return res.status(401).json({message: "Unauthorized", status: 401});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        
        console.log(decoded);

        if(!decoded){
            req.userId = decoded;
            next();
        }
    } catch (error) {
        const customMessage = error instanceof Error ? error.message : undefined;
        return res.status(500).json({message: "Internal server error", status: 500, customMessage});
    }
}

export default authMiddleware;