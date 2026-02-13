import { Router } from "express";
import {
    getStyles,
    createStyle,
    deleteStyle
} from "../controllers/style.controller.js";
import { checkAdmins } from "../middleware/admin.middleware.js";
import { langaugeMiddleware } from "../middleware/language.middleware.js";

const router = Router();

router.get("/", langaugeMiddleware, getStyles);
router.post("/", checkAdmins, createStyle);
router.delete("/:id", checkAdmins, deleteStyle);

export default router;
