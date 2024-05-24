import express from 'express'

export function app(PORT) {
  const app = express()

  // Delete name express
  app.disable("x-powered-by")

  app.use("/", (req, res) => { res.send("<h1>Welcome</h1>") })


  // Routes
  

  // Middlewares


  app.listen(PORT, () => {
    console.log(`Live server: http://localhost:${PORT}/`)
  })
}
