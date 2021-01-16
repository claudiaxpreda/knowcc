const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

require('express-async-errors')

const routes = require('./routes.js')

const app = express()

app.use(helmet())
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)

const port = process.env.PORT || 3003

app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})
