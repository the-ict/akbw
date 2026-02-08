import Joi from "joi";

const localizedStringSchema = Joi.object({
    uz: Joi.string().required(),
    ru: Joi.string().required(),
    en: Joi.string().required(),
});

const createProductSchema = Joi.object({
    price: Joi.number().required(),
    product_images: Joi.array().items(Joi.string()).required(),
    categories: Joi.array().items(Joi.number()).required(),
    sizes: Joi.array().items(Joi.number()).required(),
    colors: Joi.array().items(Joi.number()).required(),
    translations: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        lang: Joi.string().required(),
    })).required(),
});

const updateProductSchema = Joi.object({
    price: Joi.number(),
    product_images: Joi.array().items(Joi.string()),
    categories: Joi.array().items(Joi.number()),
    sizes: Joi.array().items(Joi.number()),
    colors: Joi.array().items(Joi.number()),
    translations: Joi.array().items(Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        lang: Joi.string(),
    })),
});

export { createProductSchema, updateProductSchema };
