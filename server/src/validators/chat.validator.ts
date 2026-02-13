import Joi from "joi";

export const createHelpChatSchema = Joi.object({
    receiver_id: Joi.string().required(),
});


export const createHelpMessageSchema = Joi.object({
    message: Joi.string().required(),
    chat_id: Joi.number().required(),
})

export const createAskForProductMessageSchema = Joi.object({
    message: Joi.string().required(),
    chat_id: Joi.number().required(),
    photo: Joi.string().optional(),
})

export const createAskForProductChatSchema = Joi.object({
    receiver_id: Joi.string().required(),
})