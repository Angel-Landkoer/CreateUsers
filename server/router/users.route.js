import express from 'express'
import { createUser, deleteUser, getUserId, getUsers } from '../controllers/users.controller.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { createUserSch, idUser } from '../schemas/users.schema.js'

const route = express.Router()

route.get("/", getUsers)

route.get("/:id", validatorHandler(idUser, "params"), getUserId)

route.post("/", validatorHandler(createUserSch, "body"), createUser)

route.delete("/:id", validatorHandler(idUser, "params"), deleteUser)

export default route
