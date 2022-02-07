import Joi from "joi";
const CreateBookmarkSchema = Joi.object({
  url: Joi.string().required(),
  keyWord: Joi.string().default('')
});

export { CreateBookmarkSchema };
