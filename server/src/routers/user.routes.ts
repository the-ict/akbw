import {
    Router
} from "express";
import {
    getUsers,
    getMe,
    updateProfile
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", auth, getMe);
router.put("/me", auth, updateProfile);
router.get("/", getUsers);

export default router;