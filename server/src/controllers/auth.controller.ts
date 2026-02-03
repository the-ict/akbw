import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db/client.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salt = 10;
        const hashedPass = await bcrypt.hashSync(req.body.password, salt);

        const newUser = await prisma.user.create({
            data: {
                name: req.body.name,
                female: req.body.female,
                gender: req.body.gender,
                password: hashedPass,
                phone: req.body.phone
            }
        });

        const token = jwt.sign({ id: newUser.id }, String(process.env.JWT_SECRET));

        return res.status(201).json({
            token,
            message: "User created successfully",
            ok: true,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};