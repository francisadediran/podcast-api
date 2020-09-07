import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import { errorHandler } from './config/errorHandler'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { httpStatus } from './utils/httpStatus'
import { AppError } from './utils/appError'
import { connectMysql } from './config/mysqlconnect'

const app = express()
const subpath = express()
app.use('/v1', subpath)

const swagger = require('swagger-node-express').createNew(subpath)
app.use(bodyParser.json())
app.use(helmet())

app.use(express.static('dist'))

swagger.setApiInfo({
  title: 'example API',
  description: 'API to do something, manage something...',
  termsOfServiceUrl: '',
  contact: 'yourname@something.com',
  license: '',
  licenseUrl: ''
})

swagger.configureSwaggerPaths('', 'api-docs', '')

app.use('/api', Router)

// Handle 404
app.use(function (req, res, next) {
  throw new AppError('Resource not found', httpStatus.NOT_FOUND)
})

if (process.env.USE_MONGODB === 'true') connectMongo()
// TODO: change to USE_MYSQL
if (process.env.USE_MONGODB === 'false') connectMysql()

app.use(errorHandler)

export { app }
