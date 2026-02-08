import { Router } from "express";
import { createReview, getProductReviews, getAllReviews } from "../controllers/review.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createReviewSchema, getProductReviewsSchema } from "../validators/review.validator.js";


const router = Router();

// Create a new review
router.post("/", validate(createReviewSchema), createReview);

// Get reviews for a specific product
router.get("/product/:productId", validate(getProductReviewsSchema), getProductReviews);

// Get all reviews (admin)
router.get("/", getAllReviews);

export default router;
