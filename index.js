import debug from 'debug'
import * as dotenv from 'dotenv'
const log = debug('app')
dotenv.config()
let applicationEnvVars = ['APP_ENVIROMENT', 'PORT', 'USE_MONGODB', 'USE_MYSQL']
const mysqlEnvVars = ['MYSQL_HOSTNAME', 'MYSQL_PORT', 'MYSQL_USERNAME', 'MYSQL_DATABASE', 'MYSQL_PASSWORD']
const mongoEnvVars = ['MONGO_HOSTNAME', 'MONGO_PORT', 'MONGO_DATABASE']

if (process.env.USE_MONGODB === 'true') applicationEnvVars = [...applicationEnvVars, ...mongoEnvVars]
if (process.env.USE_MYSQL === 'true') applicationEnvVars = [...applicationEnvVars, ...mysqlEnvVars]

const unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])

if (unusedEnvVars.length) {
  log('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']')
  process.exit(1)
}

const { app } = require('./server/app.js')
console.log('LISTENING ON PORT', process.env.PORT)
app.listen(process.env.PORT)

export default app
