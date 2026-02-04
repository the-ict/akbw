import {
    Router
} from "express";
import {
    getUsers
} from "../controllers/user.controller.js";
import {
    auth
} from "../middleware/auth.middleware";

const router = Router();

router.get("/", auth, getUsers);

export default router;