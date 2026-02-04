import type {
    NextFunction,
    Request,
    Response
} from "express";
import {
    prisma
} from "../db/client";
import jwt from "jsonwebtoken"

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
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
                role: req.body.role,
                access: {
                    connectOrCreate: req.body.access.map((name: string) => ({
                        where: { name },
                        create: { name }
                    }))
                },
            }
        })

        const adminToken = jwt.sign({ id: newAdmin.id }, String(process.env.JWT_SECRET), { expiresIn: "15d" });

        return res.status(200).json({
            message: "Admin created Successfully",
            ok: true,
            token: adminToken,
        })
    } catch (error) {
        next(error);
    }
};