import express from 'express'
import { createUser, deleteUser, getUserId, getUsers } from '../controllers/users.controller.js'

const route = express.Router()

route.get("/", getUsers)

route.get("/:id", getUserId)

route.post("/", createUser)

route.delete("/:id", deleteUser)

export default route
