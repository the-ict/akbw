import type {
    NextFunction,
    Request,
    Response
} from "express";

export const langaugeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const acceptLanguage = req.headers["accept-language"];
        console.log("accept-language: ", acceptLanguage);

        let languageCode: 'uz' | 'ru' | 'en' = 'uz';

        if (acceptLanguage) {
            const code = acceptLanguage?.split(',')[0]?.split('-')[0]?.toLowerCase();
            if (code && ['uz', 'ru', 'en'].includes(code)) {
                languageCode = code as 'uz' | 'ru' | 'en';
            }
        }
        (req as any).languageCode = languageCode;
    } catch (error) {
        console.error("Language Middleware error:", error);
    }
    next();
};