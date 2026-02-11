import { Router } from "express";
import { langaugeMiddleware } from "../middleware/language.middleware";
import { auth } from "../middleware/auth.middleware";
import { getOrders, reviewOrder } from "../controllers/order.controller";

const router = Router();

router.post("/", auth, reviewOrder)
router.get("/", auth, langaugeMiddleware, getOrders)


export default router;