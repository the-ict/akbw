import Joi from "joi";

export const reviewOrderValidator = Joi.object({
    items: Joi.array().items(Joi.number()).required(),
    total_price: Joi.number().required(),
    coupon_id: Joi.number().optional(),
    coupon_code: Joi.string().optional(),
});