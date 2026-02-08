import type { NextFunction, Request, Response } from "express";

export const langaugeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const acceptLanguage = req.headers["accept-language"];
        console.log("accept-language: ", acceptLanguage);

        // Normalize and validate language code
        let languageCode: 'uz' | 'ru' | 'en' = 'uz'; // Default

        if (acceptLanguage) {
            const code = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
            if (['uz', 'ru', 'en'].includes(code)) {
                languageCode = code as 'uz' | 'ru' | 'en';
            }
        }

        (req as any).languageCode = languageCode;
        next();
    } catch (error) {
        return res.status(500).json({
            error,
            message: "Language Middleware failed",
            ok: false,
        });
    }
};