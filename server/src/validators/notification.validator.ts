import Joi from "joi"

export const createNotificationValidator = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
});