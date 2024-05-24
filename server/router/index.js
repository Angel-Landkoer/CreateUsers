import express from 'express'
import routeUser from './users.route.js'

export function routeAPI(app) {
  const route = express.Router()
  app.use("/api/v1", route)

  route.use("/users", routeUser)
}
