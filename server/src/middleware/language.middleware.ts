import type { NextFunction, Request, Response } from "express";

export const langaugeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const langaugeCode = req.headers["accept-language"];
        console.log("language-code: ", langaugeCode);
        if (langaugeCode && langaugeCode?.length > 1) {
            (req as any).languageCode = langaugeCode;
            next()
        } else {
            return res.status(500).json({
                langaugeCode,
                message: "Language code is not valid",
                ok: false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            error,
            message: "Langauge Middleware failed",
            ok: false,
        })
    }
}