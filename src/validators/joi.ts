import Joi, { string } from "joi";

const userSchema = Joi.object({
    phone: Joi.string().regex(/^\+254\d{9}$/).messages({
        'string.pattern.base':'invalid phone number'
    }),
    name:Joi.string().messages({
        'string.pattern.base':'invalid user name'
    }),
    email:Joi.string().email().messages({
        'string.pattern.base':'invalid email address'
    }),
    image:Joi.string().messages({
        'string.pattern.base':'invalid user image'
    }),
})

const otpSchema = Joi.string().messages({
    'string.pattern.base':'invalid phone number'

})
const phoneSchema =  Joi.string().regex(/^\+254\d{9}$/).messages({
    'string.pattern.base':'invalid phone number'
})
export {
    userSchema,
    otpSchema,
    phoneSchema
}
