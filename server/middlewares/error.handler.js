export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack
  })
}

export const boomErrorHandler = (err, req, res, next) => {

  if (err.isBoom) {
    const { output } = err

    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}
