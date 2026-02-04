import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createRoleSchema } from "../validators/admin.validator";
import {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
} from "../controllers/admin.controller";

const router = Router();

router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.post("/", validate(createRoleSchema), createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;