import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", ok: false, });
        }

        const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET));

        if (decodedToken) {
            next();
        } else {
            return res.status(401).json({ message: "Unauthorized", ok: false, });
        }
    } catch (error) {
        return res.status(500).json({ message: "Auth middleware failed", ok: false, });
    }
}