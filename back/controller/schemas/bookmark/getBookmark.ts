import Joi from "joi";
const GetBookmarkSchema = Joi.object({
    order: Joi.string().valid('ASC', 'DESC').default('ASC'),
    limit: Joi.number().default(10),
    offset: Joi.number().default(0),
    keyWord: Joi.string().default('')
});

interface getBookmarkInterface {
    order: string
    limit: number
    offset: number
    keyWord: string
}

export { GetBookmarkSchema, getBookmarkInterface };
