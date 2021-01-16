const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('express-async-errors')
require('log-timestamp')
// const { ServerError } = require('./errors')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', routes)

// app.use((err, req, res, next) => {
//   const status = 500
//   const message = 'Something Bad Happened'

//   console.error(err)

//   if (err instanceof ServerError) {
//     status = err.httpStatus
//     message = err.message
//   } else if (err.isAxiosError) {
//     return next(createError(err.response.status, err))
//   }
//   return next(createError(status, message))
// })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App is listening on ${port}`)
})
