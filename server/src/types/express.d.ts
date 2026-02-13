import type { prisma } from "../db/client";

declare global {
    namespace Express {
        interface Request {
            user: string;
            admin: string;
        }
    }
};