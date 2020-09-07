import Joi from 'joi'

export const newpost = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required()
})
