import { userModel } from './user.model'
import { httpStatus } from '../../utils/httpStatus'
import { pool } from '../../config/mysqlconnect'
const users = {}

/**
 * Get user by Id
 * @returns {User}
 */
users.getById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id)
    if (user) {
      user.password = null
      return res.json(user)
    } else {
      return res.status(404).send('User not found')
    }
  } catch (e) {
    next(e)
  }
}

users.index = async (req, res) => {
  const users = await userModel.find({}, { password: 0, __v: 0 })
  return res.json({ data: { users } })
}

users.create = async (req, res) => {
  const data = await userModel.create(req.body)
  const { password, __v, ...user } = data.toObject()
  return res.status(httpStatus.CREATED).json({ data: { user } })
}

users.update = async (req, res) => {
  const user = await userModel.findById(req.params.id)
  if (!user) return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' })
  Object.assign(user, req.body)
  await user.save()
  return res.json({ message: 'Record updated' })
}

users.testMysql = async (req, res) => {
  const data = await pool.query('Select * from users')
  return res.json({ data })
}
export { users }
