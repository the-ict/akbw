import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    gender: Joi.string().required(),
});

export const loginSchema = Joi.object({
    phone: Joi.string().required(),
});