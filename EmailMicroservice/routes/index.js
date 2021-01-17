const Router = require('express').Router()

const EmailRoute = require('./email.js')

Router.use('/email', EmailRoute)

module.exports = Router
