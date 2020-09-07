import express from 'express'
import { tags } from './tags.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'

const tagRoutes = express.Router()

// tagsRoutes.get('/', asyncWrapper(tags.index))
// tagsRoutes.get('/query', asyncWrapper(tags.query))
// tagsRoutes.get('/list', asyncWrapper(tags.list))
// tagsRoutes.post('/', validate(newpost), asyncWrapper(tags.create))
tagRoutes.post('/', asyncWrapper(tags.create))

// tagsRoutes.put('/:id', asyncWrapper(tags.update))

export { tagRoutes }
