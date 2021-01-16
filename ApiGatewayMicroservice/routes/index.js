const Router = require('express').Router()

const AuthRoute = require('./auth.js')
const QuestionsRoute = require('./questions.js')
const TestsRoute = require('./tests.js')
const ChallengesRoute = require('./challenges.js')
const UsersRoute = require('./users.js')

Router.use('/auth', AuthRoute)
Router.use('/questions', QuestionsRoute)
Router.use('/tests', TestsRoute)
Router.use('/challenges', ChallengesRoute)
Router.use('/users', UsersRoute)

module.exports = Router
