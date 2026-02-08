import {
    Router
} from "express";
import {
    getUsers
} from "../controllers/user.controller.js";
import {
    checkAdmins
} from "../middleware/admin.middleware.js";

const router = Router();

router.get("/", checkAdmins, getUsers);

export default router;