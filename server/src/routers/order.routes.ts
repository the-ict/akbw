import { Router } from "express";
import { langaugeMiddleware } from "../middleware/language.middleware";
import { auth } from "../middleware/auth.middleware";
import { getOrders, reviewOrder } from "../controllers/order.controller";
import { validate } from "../middleware/validate.middleware";
import { reviewOrderValidator } from "../validators/order.validator";

const router = Router();

router.post("/", auth, validate(reviewOrderValidator), reviewOrder)
router.get("/", auth, langaugeMiddleware, getOrders)


export default router;