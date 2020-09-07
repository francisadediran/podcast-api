import express from 'express'
import { categories } from './categories.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'

const categoryRoutes = express.Router()

// categoryRoutes.get('/', asyncWrapper(category.index))
// categoryRoutes.get('/query', asyncWrapper(category.query))
// categoryRoutes.get('/list', asyncWrapper(category.list))
// categoryRoutes.post('/', validate(newpost), asyncWrapper(category.create))
categoryRoutes.post('/', asyncWrapper(categories.create))

// categoryRoutes.put('/:id', asyncWrapper(category.update))

export { categoryRoutes }
