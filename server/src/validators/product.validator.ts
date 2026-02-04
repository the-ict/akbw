import Joi from "joi";

const localizedStringSchema = Joi.object({
    uz: Joi.string().required(),
    ru: Joi.string().required(),
    en: Joi.string().required(),
});

const createProductSchema = Joi.object({
    name: localizedStringSchema.required(),
    price: Joi.number().required(),
    product_images: Joi.array().items(Joi.string()).required(),
    category_id: Joi.array().items(Joi.number()).required(),
    size_id: Joi.array().items(Joi.number()).required(),
    color_id: Joi.array().items(Joi.number()).required(),
});

const updateProductSchema = Joi.object({
    name: localizedStringSchema,
    price: Joi.number(),
    product_images: Joi.array().items(Joi.string()),
    category_id: Joi.array().items(Joi.number()),
    size_id: Joi.array().items(Joi.number()),
    color_id: Joi.array().items(Joi.number()),
});

export { createProductSchema, updateProductSchema };
