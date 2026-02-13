import { prisma } from "../db/client";
import type { NextFunction, Request, Response } from "express";

export const createHelpChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sender_id, receiver_id } = req.body;

        const createHelpChat = await prisma.helpChat.create({
            data: {
                members: [sender_id, receiver_id]
            }
        });

        return res.status(201).json(createHelpChat);
    } catch (error) {
        next(error);
    }
}

export const createHelpChatMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, chat_id, sender_id } = req.body;

        const createHelpChatMessage = await prisma.helpChatMessages.create({
            data: {
                message: message,
                sender_id: sender_id,
                chat_id: chat_id
            }
        })

        return res.status(201).json(createHelpChatMessage);
    } catch (error) {
        next(error);
    }
};

export const createAskForProductChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sender_id, receiver_id } = req.body;

        const createAskForProductChat = await prisma.askForChat.create({
            data: {
                members: [sender_id, receiver_id]
            }
        });

        return res.status(201).json(createAskForProductChat);
    } catch (error) {
        next(error);
    }
}

export const createAskForProductMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {

    }
}