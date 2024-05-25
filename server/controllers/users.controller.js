import { UserService } from '../models/sqlite/users.service.js'

const service = UserService

export const getUsers = async (req, res, next) => {
  try {
    const data = await service.getAll()

    res.status(200).json({ data: data.rows })
  } catch (err) {
    next(err)
  }
}

export const getUserId = async (req, res, next) => {

  const { id } = req.params
  try {
    const data = await service.getId(id)
    res.status(200).json({ data: data.rows })
  } catch (err) {
    next(err)
  }
}


export const createUser = async (req, res, next) => {

  const body = req.body
  try {
    const data = await service.create(body)
    res.status(201).json({ data })
  } catch (err) {
    next(err)
  }
}


export const deleteUser = async (req, res, next) => {

  const { id } = req.params
  try {
    const data = await service.delete(id)

    res.status(204).json({ data })
  } catch (err) {
    next(err)
  }
}
