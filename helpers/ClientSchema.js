import Joi from "joi";
export const clientSchema = Joi.object({
  clientId: Joi.number().required(),
  agencyId: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneno: Joi.number().required(),
  totalbill: Joi.number().required(),
});
