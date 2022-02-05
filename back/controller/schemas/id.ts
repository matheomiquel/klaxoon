import Joi from "joi";
const IdSchema = Joi.object({
  id: Joi.number().required(),
});

export { IdSchema };
