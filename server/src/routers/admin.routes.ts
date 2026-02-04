import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createRoleSchema } from "../validators/admin.validator";
import { createRole } from "../controllers/admin.controller";

const router = Router();

router.post("/", validate(createRoleSchema), createRole);

export default router;