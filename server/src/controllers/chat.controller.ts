import { prisma } from "../db/client";
import type {
    NextFunction,
    Request,
    Response
} from "express";

export const createHelpChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { receiver_id } = req.body;
        const user_id = req.user;

        const chat = await prisma.helpChat.create({
            data: {
                members: [user_id, receiver_id],
                user_id: user_id,
            }
        });

        return res.status(201).json(chat);
    } catch (error) {
        next(error);
    }
}

export const getHelpChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user;
        const chat = await prisma.helpChat.findFirst({
            where: {
                user_id: user_id
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        return res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
}

export const createHelpChatMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, chat_id } = req.body;
        const sender_id = req.user;
        const admin_id = (req as any).admin?.id;

        const createHelpChatMessage = await prisma.helpChatMessages.create({
            data: {
                message: message,
                sender_id: sender_id || null,
                admin_id: admin_id || null,
                chat_id: Number(chat_id)
            }
        })

        return res.status(201).json(createHelpChatMessage);
    } catch (error) {
        next(error);
    }
};

export const getAllHelpChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chats = await prisma.helpChat.findMany({
            include: {
                user: true,
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return res.status(200).json(chats);
    } catch (error) {
        next(error);
    }
}

export const createAskForProductChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { receiver_id } = req.body;
        const user_id = req.user;

        const chat = await prisma.askForChat.create({
            data: {
                members: [user_id, receiver_id],
                user_id: user_id,
            }
        });

        return res.status(201).json(chat);
    } catch (error) {
        next(error);
    }
}

export const getAskForProductChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user;
        const chat = await prisma.askForChat.findFirst({
            where: {
                user_id: user_id
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        return res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
}

export const getAllAskForProductChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chats = await prisma.askForChat.findMany({
            include: {
                user: true,
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return res.status(200).json(chats);
    } catch (error) {
        next(error);
    }
}

export const createAskForProductMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, chat_id, photo } = req.body;
        const sender_id = req.user;
        const admin_id = (req as any).admin?.id;

        const askForProductChatMessage = await prisma.askForChatMessages.create({
            data: {
                sender_id: sender_id || null,
                admin_id: admin_id || null,
                chat_id: Number(chat_id),
                message: message,
                photo: photo || "",
            }
        })

        return res.status(201).json(askForProductChatMessage);
    } catch (error) {
        next(error);
    }
};