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

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = (req as any).user;
        const user = await prisma.user.findUnique({
            where: { id: user_id },
            include: {
                reviews: true,
                orders: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found", ok: false });
        }

        return res.status(200).json({ data: user, ok: true });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = (req as any).user;
        const { name, lastName, gender, phone, profile_picture } = req.body;

        const user = await prisma.user.update({
            where: { id: user_id },
            data: {
                name,
                lastName,
                gender,
                phone,
                profile_picture
            }
        });

        return res.status(200).json({ message: "Profile updated successfully", data: user, ok: true });
    } catch (error) {
        next(error);
    }
};

