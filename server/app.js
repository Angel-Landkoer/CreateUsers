import express, { json } from 'express'
import { routeAPI } from './router/index.js'
import { boomErrorHandler, errorHandler } from './middlewares/error.handler.js'
import { corsHandler } from './middlewares/cors.handler.js'

export function app(PORT) {
  const app = express()

  // Delete name express
  app.disable("x-powered-by")

  app.get("/", (req, res) => { res.send("<h1>Welcome</h1>") })


  // Routes
  routeAPI(app)

  // Middlewares
  app.use(json())
  app.use(corsHandler())
  app.use(boomErrorHandler)
  app.use(errorHandler)


  app.listen(PORT, () => {
    console.log(`Live server: http://localhost:${PORT}/`)
  })
}
