import Joi from "joi";
export const registerSchema = Joi.object({
  agencyId: Joi.number().required(),
  agencyname: Joi.string().required(),
  address1: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  phoneno: Joi.number().required(),
});
