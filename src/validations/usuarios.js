import Joi from 'joi'

const schema = Joi.object(
    {
        username: Joi.string()
            .max(15)
            .required(),
        password:Joi.string()
            .min(6)
            .max(15)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        firstname: Joi.string()
            .required(),
        lastname: Joi.string()
            .required(),
        avatar: Joi.string()
            .dataUri()
            .required(),
        thumbnail: Joi.string()
    }
)

export default schema;

