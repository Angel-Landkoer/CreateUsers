import Joi from 'joi'

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(30)
const age = Joi.number().integer().min(10).max(100)
const email = Joi.string().email()
const avatar = Joi.string().uri()

export const idUser = Joi.object({
  id: id.required()
})

export const createUserSch = Joi.object({
  name: name.required(),
  age: age.required(), 
  email: email.required(),
  avatar: avatar.required()
})
