import type {
    NextFunction,
    Request,
    Response
} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    prisma
} from "../db/client.js";


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
        const user = await prisma.user.findUnique({
            where: {
                phone: req.body.phone
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, String(process.env.JWT_SECRET));

        return res.status(200).json({
            token,
            message: "User logged in successfully",
            ok: true,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

