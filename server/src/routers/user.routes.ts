import {
    Router
} from "express";
import {
    getUsers,
    getMe,
    updateProfile
} from "../controllers/user.controller.js";
import {
    checkAdmins
} from "../middleware/admin.middleware.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", auth, getMe);
router.put("/me", auth, updateProfile);
router.get("/", checkAdmins, getUsers);

export default router;