import type {
    NextFunction,
    Request,
    Response
} from "express";
import jwt from "jsonwebtoken"

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            console.warn("Auth failed: No token provided");
            return res.status(401).json({ message: "Unauthorized: No token provided", ok: false });
        }
        const decodedToken: any = jwt.verify(token, String(process.env.JWT_SECRET));

        if (decodedToken.id) {
            (req as any).user = decodedToken.id;
            next();
        } else {
            console.warn("Auth failed: Invalid token decoded");
            return res.status(401).json({ message: "Unauthorized: Invalid token", ok: false });
        }
    } catch (error: any) {
        console.log(error, "json error");
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            console.warn(`Auth failed: ${error.message}`);
            return res.status(401).json({ message: `Unauthorized: ${error.message}`, ok: false });
        }
        console.error("Auth middleware error:", error);
        return res.status(500).json({ message: "Internal server error during authentication", ok: false });
    }
}