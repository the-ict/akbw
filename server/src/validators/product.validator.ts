import Joi from "joi";

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

const categoriesSchema = Joi.object({
    translations: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        lang: Joi.string().required(),
    })).required(),
});

const categoriesUpdateSchema = Joi.object({
    id: Joi.number(),
    translations: Joi.array().items(Joi.object({
        name: Joi.string(),
        lang: Joi.string(),
    })).required(),
});

const sizesSchema = Joi.object({
    translations: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        lang: Joi.string().required(),
    })).required(),
});

const sizesUpdateSchema = Joi.object({
    id: Joi.number(),
    translations: Joi.array().items(Joi.object({
        name: Joi.string(),
        lang: Joi.string(),
    })).required(),
});

const colorsSchema = Joi.object({
    translations: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        lang: Joi.string().required(),
    })).required(),
});

const colorsUpdateSchema = Joi.object({
    id: Joi.number(),
    translations: Joi.array().items(Joi.object({
        name: Joi.string(),
        lang: Joi.string(),
    })).required(),
});

export {
    createProductSchema,
    updateProductSchema,
    categoriesSchema,
    categoriesUpdateSchema,
    sizesSchema,
    sizesUpdateSchema,
    colorsSchema,
    colorsUpdateSchema
};
