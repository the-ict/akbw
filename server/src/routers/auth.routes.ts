import {
    Router
} from "express";
import {
    register,
    login,
    getUsers
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import {
    auth
} from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/users", auth, getUsers);

export default router;