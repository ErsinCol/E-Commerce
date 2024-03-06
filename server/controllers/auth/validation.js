import Joi from "joi";

const RegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
})

export {
    RegisterSchema
}