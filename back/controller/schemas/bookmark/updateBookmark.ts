import Joi from "joi";
const UpdateBookmarkSchema = Joi.object({
    keyWord: Joi.string().default('')
});

export { UpdateBookmarkSchema };
