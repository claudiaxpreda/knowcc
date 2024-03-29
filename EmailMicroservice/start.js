const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

require('express-async-errors')
require('log-timestamp')

const routes = require('./routes')

const app = express()

app.use(helmet())
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)

const port = process.env.PORT || 3005

app.listen(port, () => {
  console.log(`App is listening on ${port}`)
})
