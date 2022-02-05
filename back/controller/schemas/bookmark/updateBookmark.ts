import Joi from "joi";
const UpdateBookmarkSchema = Joi.object({
    keyWord: Joi.array().items(Joi.string()).required()
});

export { UpdateBookmarkSchema };
