import type { prisma } from "../db/client";

declare global {
    namespace Express {
        interface Request {
            user: string;
            admin: {
                id: number;
                name: string;
                lastName: string;
            };
            languageCode: string;
        }
    }
};