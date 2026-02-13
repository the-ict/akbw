import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createRoleSchema } from "../validators/admin.validator";
import {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    getAdminMe
} from "../controllers/admin.controller";
import { checkAdmins } from "../middleware/admin.middleware";

const router = Router();

router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.post("/", validate(createRoleSchema), createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/me", checkAdmins, getAdminMe);

export default router;