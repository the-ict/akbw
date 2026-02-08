import type { Request, Response } from "express";
import path from "path";

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const protocol = req.protocol;
        const host = req.get("host");
        const filePath = req.file.path.replace(/\\/g, "/"); // For Windows compatibility if needed
        const fileName = path.basename(filePath);
        const fileUrl = `${protocol}://${host}/uploads/${fileName}`;

        return res.status(200).json({
            url: fileUrl,
            message: "File uploaded successfully"
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
