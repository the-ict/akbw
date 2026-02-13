import { Router } from "express";
import {
    getStyles,
    createStyle,
    deleteStyle
} from "../controllers/style.controller.js";
import { checkAdmins } from "../middleware/admin.middleware.js";
import { langaugeMiddleware } from "../middleware/language.middleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
        }
    }
});

router.get("/", langaugeMiddleware, getStyles);
router.post("/", checkAdmins, upload.single("image"), createStyle);
router.delete("/:id", checkAdmins, deleteStyle);

export default router;
