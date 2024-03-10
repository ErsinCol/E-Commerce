import Joi from "joi";

const Create = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(3),
    price: Joi.string().required(),
    photos: Joi.array().items(Joi.string()),
}).options({allowUnknown: false});

const Update = Joi.object({
    title: Joi.string(),
    description: Joi.string().min(3),
    price: Joi.string(),
    photos: Joi.array().items(Joi.string()),
}).options({allowUnknown: false});

export default { Create, Update }