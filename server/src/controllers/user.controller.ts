import type {
    NextFunction,
    Request,
    Response
} from "express";
import {
    prisma
} from "../db/client.js";


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error in getUsers controller:", error);
        next(error);
    }
};

