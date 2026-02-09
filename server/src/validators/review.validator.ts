import Joi from "joi";

export const createReviewSchema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().required(),
});

export const getProductReviewsSchema = Joi.object({
    productId: Joi.number().integer().positive().required(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
});