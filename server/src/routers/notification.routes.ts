import { Router } from "express";
import {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
} from "../controllers/notification.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAdmins } from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createNotificationValidator } from "../validators/notification.validator.js";

const router = Router();

router.get("/", getNotifications);
router.post("/", validate(createNotificationValidator), createNotification);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

export default router;
