import Joi from "@hapi/joi";

const validateSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  userName: Joi.string().min(4).required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  password: Joi.string().min(6).required(),
});

export default validateSchema;
