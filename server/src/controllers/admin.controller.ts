import type {
    NextFunction,
    Request,
    Response
} from "express";
import {
    prisma
} from "../db/client";
import jwt from "jsonwebtoken";

export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await prisma.admins.findMany({
            include: {
                access: true
            }
        });
        return res.status(200).json(admins);
    } catch (error) {
        next(error);
    }
};

export const getAdminById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const admin = await prisma.admins.findUnique({
            where: { id: Number(id) },
            include: {
                access: true
            }
        });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allreadyExists = await prisma.admins.findUnique({
            where: {
                phone: req.body.phone
            }
        });

        if (allreadyExists?.id) {
            return res.status(400).json({
                message: "User allready exists with this phone number you have to enter other phone number or delete the user",
                ok: false,
            })
        };

        const newAdmin = await prisma.admins.create({
            data: {
                name: req.body.name,
                lastName: req.body.lastName,
                phone: req.body.phone,
                role: req.body.role || 'Moderator',
                access: {
                    connectOrCreate: (req.body.access || []).map((name: string) => ({
                        where: { name },
                        create: { name }
                    }))
                },
            }
        })

        const adminToken = jwt.sign(
            { id: newAdmin.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1y" }
        );

        return res.status(201).json({
            message: "Admin created Successfully",
            ok: true,
            token: adminToken,
            admin: newAdmin
        })
    } catch (error) {
        next(error);
    }
};

export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, lastName, phone, role, access } = req.body;

        const updateData: any = {
            name,
            lastName,
            phone,
            role,
        };

        if (access) {
            updateData.access = {
                set: [], // Disconnect all first to replace
                connectOrCreate: access.map((name: string) => ({
                    where: { name },
                    create: { name }
                }))
            };
        }

        const updatedAdmin = await prisma.admins.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                access: true
            }
        });

        return res.status(200).json({
            message: "Admin updated successfully",
            admin: updatedAdmin
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.admins.delete({
            where: { id: Number(id) }
        });
        return res.status(200).json({
            message: "Admin deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};