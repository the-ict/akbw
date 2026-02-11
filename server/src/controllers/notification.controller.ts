import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client.js";

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await prisma.notifications.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({ data: notifications, ok: true });
    } catch (error) {
        next(error);
    }
};

export const createNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: "Title and message are required", ok: false });
        }

        const notification = await prisma.notifications.create({
            data: {
                title,
                message
            }
        });

        return res.status(201).json({ message: "Notification created successfully", data: notification, ok: true });
    } catch (error) {
        next(error);
    }
};

export const updateNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, message } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID is required", ok: false });
        }

        const notification = await prisma.notifications.update({
            where: { id: parseInt(id as string) },
            data: {
                title,
                message
            }
        });

        return res.status(200).json({ message: "Notification updated successfully", data: notification, ok: true });
    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID is required", ok: false });
        }

        await prisma.notifications.delete({
            where: { id: parseInt(id as string) }
        });

        return res.status(200).json({ message: "Notification deleted successfully", ok: true });
    } catch (error) {
        next(error);
    }
};
