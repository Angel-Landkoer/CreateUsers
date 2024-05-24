

export const getUsers = async (req, res, next) => {
  try {

    res.status(200).json({})
  } catch (err) {
    next(err)
  }
}

export const getUserId = async (req, res, next) => {
  try {

    res.status(200).json({})
  } catch (err) {
    next(err)
  }
}


export const createUser = async (req, res, next) => {
  try {

    res.status(201).json({})
  } catch (err) {
    next(err)
  }
}


export const deleteUser = async (req, res, next) => {
  try {

    res.status(204).json({})
  } catch (err) {
    next(err)
  }
}
