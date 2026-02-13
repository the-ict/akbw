import {
    Router
} from "express";
import {
    validate
} from "../middleware/validate.middleware.js";
import {
    createRoleSchema
} from "../validators/admin.validator.js";
import {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    getAdminMe
} from "../controllers/admin.controller.js";
import { checkAdmins } from "../middleware/admin.middleware.js";

const router = Router();

router.get("/me", checkAdmins, getAdminMe);
router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.post("/", validate(createRoleSchema), createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;