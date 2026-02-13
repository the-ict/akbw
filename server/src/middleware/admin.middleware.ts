import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "../db/client";

export const checkAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "No token provided",
                ok: false,
            });
        }

        const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload & { id: string | number };

        if (!decodedToken || typeof decodedToken === 'string' || !decodedToken.id) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid token payload",
                ok: false,
            });
        }

        const admin = await prisma.admins.findUnique({
            where: {
                id: Number(decodedToken.id),
            },
            include: {
                access: true,
            }
        });

        if (!admin) {
            return res.status(404).json({
                error: "Not Found",
                message: "Admin not found",
                ok: false,
            });
        }

        (req as any).admin = admin;
        next();
    } catch (error: any) {
        console.error("checkAdmins middleware error:", error);
        return res.status(error.name === 'JsonWebTokenError' ? 401 : 500).json({
            error: error.message || error,
            message: error.name === 'JsonWebTokenError' ? "Invalid token" : "check admins middleware failed",
            ok: false,
        });
    }
}