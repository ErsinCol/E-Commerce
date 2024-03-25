import Joi from "joi";

const Create = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(3),
    price: Joi.number().required(),
    photos: Joi.array().items(Joi.string()),
}).options({allowUnknown: false});

const Update = Joi.object({
    title: Joi.string(),
    description: Joi.string().min(3),
    price: Joi.number(),
    photos: Joi.array().items(Joi.string()),
}).options({allowUnknown: false});

export default { Create, Update }