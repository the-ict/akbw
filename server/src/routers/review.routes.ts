import { Router } from "express";
import {
    createReview,
    getProductReviews,
    getAllReviews,
    deleteReview
} from "../controllers/review.controller.js";
import {
    validate
} from "../middleware/validate.middleware.js";
import {
    createReviewSchema,
    getProductReviewsSchema
} from "../validators/review.validator.js";
import {
    auth
} from "../middleware/auth.middleware.js";


const router = Router();

router.post("/", auth, validate(createReviewSchema), createReview);

router.get("/product/:productId", validate(getProductReviewsSchema), getProductReviews);

router.get("/", getAllReviews);

router.delete("/:reviewId", auth, deleteReview);

export default router;
