import Joi from "@hapi/joi";

const validateSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    userName: Joi.string().min(4).required(),
    phone: Joi.number().min(1).max(10).required(),
    password: Joi.string().min(6).required()
})

export default validateSchema;