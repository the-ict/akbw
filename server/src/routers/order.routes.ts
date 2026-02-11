import { Router } from "express";
import { langaugeMiddleware } from "../middleware/language.middleware";
import { auth } from "../middleware/auth.middleware";
import { getAllOrders, getOrders, reviewOrder, updateOrderStatus } from "../controllers/order.controller";
import { validate } from "../middleware/validate.middleware";
import { reviewOrderValidator } from "../validators/order.validator";

const router = Router();

router.post("/", auth, validate(reviewOrderValidator), reviewOrder)
router.get("/", auth, langaugeMiddleware, getOrders)
router.get("/all", auth, getAllOrders)
router.patch("/:id/status", auth, updateOrderStatus)


export default router;