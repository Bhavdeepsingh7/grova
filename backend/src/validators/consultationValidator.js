import Joi from "joi";

const consultationSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().min(6).required(),
  company: Joi.string().trim().allow(""),
  service: Joi.string().trim().required(),
  budget: Joi.string().trim().required(),
  timeline: Joi.string().trim().required(),
  message: Joi.string().trim().allow(""),
});

export default consultationSchema;
