import Joi from "joi";

const sendSmsSchema = Joi.object({
    phone: Joi.string().required(),
});

const verifySmsSchema = Joi.object({
    phone: Joi.string().required(),
    code: Joi.string().required(),
});

export {
    sendSmsSchema,
    verifySmsSchema,
};