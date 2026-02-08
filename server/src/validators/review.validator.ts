import Joi from "joi";

export const createReviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().min(1).max(500).required(),
    userName: Joi.string().min(1).max(100).required(),
    productId: Joi.number().integer().positive().required(),
});

export const getProductReviewsSchema = Joi.object({
    productId: Joi.number().integer().positive().required(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
});

