import { prisma } from "../db/client";
import type { NextFunction, Request, Response } from "express";

export const createChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sender_id, receiver_id } = req.body;
        const chat = await prisma.chat.create({
            data: {
                members: [sender_id, receiver_id],
            }
        });

        return res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
}