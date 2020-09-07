import express from 'express'
import { posts } from './posts.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { validate } from '../../utils/validate'
import { newpost } from './post.validations'

const postRoutes = express.Router()

postRoutes.get('/', asyncWrapper(posts.index))
postRoutes.get('/query', asyncWrapper(posts.query))
postRoutes.get('/list', asyncWrapper(posts.list))
postRoutes.post('/', validate(newpost), asyncWrapper(posts.create))
postRoutes.post('/', asyncWrapper(posts.create))

export { postRoutes }
