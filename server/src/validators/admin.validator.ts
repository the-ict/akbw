import Joi from "joi";

const createRoleSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    role: Joi.string().required(),
    access: Joi.array().items(Joi.string()).required(),
});

export { createRoleSchema };