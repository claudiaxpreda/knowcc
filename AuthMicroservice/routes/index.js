const Router = require('express').Router()

const RegisterRoute = require('./register.js')
const LoginRoute = require('./login.js')
const VerifyRoute = require('./verify.js')

Router.use('/register', RegisterRoute)
Router.use('/login', LoginRoute)
Router.use('/verify', VerifyRoute)

module.exports = Router
